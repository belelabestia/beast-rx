import { ChangeDetectorRef, Inject, Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  Observable,
  scan,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import {
  CONTEXT,
  CONTEXT_KEY,
  FEATURE,
  INIT,
  LOGGER,
} from './injection-tokens';
import { Action, Init, InitArgs, Storage } from './interfaces';

@Injectable()
export class BeastRx<State, Feature> {
  actions: Subject<Action<State, Feature>>;
  state: Observable<State>;

  constructor(
    ref: ChangeDetectorRef,
    @Inject(CONTEXT) public ctx: BeastCtx<Storage<State>> | null,
    @Inject(INIT) init: Init<State, Feature>,
    @Inject(FEATURE) public feature: Feature,
    @Inject(LOGGER) public log: typeof console.log,
    @Inject(CONTEXT_KEY) public key: string | null
  ) {
    const changes = new Subject<Action<State, Feature>>();

    const initialState = (
      init(this) as (args: InitArgs<State, Feature>) => State
    )({ rx: this });

    this.actions = changes;

    this.state = changes.pipe(
      scan(
        (state, action) => ({ ...state, ...action({ state, rx: this }) }),
        initialState
      ),
      startWith(initialState),
      distinctUntilChanged(),
      tap((state) => {
        this.log('BeastRx update: ', { state });

        setTimeout(() => {
          if (this.key !== null) {
            this.ctx?.dispatcher.next({ [this.key]: state });
          }

          ref.detectChanges();
        });
      })
    );
  }
}

@Injectable()
export class BeastCtx<State> {
  dispatcher = new Subject<State>();

  storage = this.dispatcher.pipe(
    scan((acc, next) => ({ ...acc, ...next }), {} as State),
    tap(() => setTimeout(() => this.ref.detectChanges())),
    tap((state) => this.log('BeastCtx update: ', { state }))
  );

  constructor(
    private ref: ChangeDetectorRef,
    @Inject(LOGGER) public log: typeof console.log
  ) {}
}

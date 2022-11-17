import {
  ChangeDetectorRef,
  Component,
  ComponentDecorator,
  Directive,
  Inject,
  Injectable,
  InjectionToken,
  OnDestroy,
  Optional,
  Provider,
  TypeDecorator,
} from '@angular/core';
import {
  distinctUntilChanged,
  Observable,
  scan,
  startWith,
  Subject,
  Subscription,
  tap,
} from 'rxjs';

export interface Changes<State> extends Subject<Action<State>> {}

export interface Init<State> {
  (changes: Subject<Action<State>>): State;
}

export interface Action<State> {
  (state: State, changes: Changes<State>): State;
}

export interface ActionFactory<State> {
  (value: any): Action<State>;
}

export interface ActionRecord<State> {
  [key: string]: Action<State> | ActionFactory<State>;
}

export const INIT = new InjectionToken<Init<any>>('init');
export const ACTIONS = new InjectionToken<ActionRecord<any>>('actions');

export const createActions =
  <State>() =>
  <A extends ActionRecord<State>>(actionRecord: A): A =>
    actionRecord;

export const provide = <State, T extends ActionRecord<State>>(
  init: Init<State>,
  actions: T
): Provider[] => [
  {
    provide: INIT,
    useValue: init,
  },
  {
    provide: ACTIONS,
    useValue: actions,
  },
  BeastRx,
];

@Injectable()
export class BeastRx<State, T extends ActionRecord<State>> {
  changes: Subject<Action<State>>;

  state: Observable<State>;

  constructor(
    ref: ChangeDetectorRef,
    @Inject(INIT) init: Init<State>,
    @Inject(ACTIONS) public actions: T
  ) {
    const changes = new Subject<Action<State>>();
    const initialState = init(changes);

    this.changes = changes;

    this.state = changes.pipe(
      scan((state, action) => action(state, changes), initialState),
      startWith(initialState),
      distinctUntilChanged(),
      tap(() => setTimeout(() => ref.detectChanges())),
      tap(console.log)
    );
  }
}

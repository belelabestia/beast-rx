import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import {
  map,
  Observable,
  scan,
  startWith,
  Subject,
  Subscription,
  tap,
} from 'rxjs';

export interface Stream<State> extends Subject<Action<State>> {}

export interface Action<State> {
  (state: State, stream: Stream<State>): State;
}

export interface ActionFactory<State> {
  (value: any): Action<State>;
}

// TODO
// export interface Effect<State> {
//   (action: Subject<Action<State>>): void;
// }

export interface ActionRecord<State> {
  [key: string]: Action<State> | ActionFactory<State>;
}

export interface Init<State> {
  (actions: Subject<Action<State>>): State;
}

export const createActions =
  <State>() =>
  <A extends ActionRecord<State>>(actionRecord: A): A =>
    actionRecord;

export const beastRx = <State, T extends ActionRecord<State>>(
  init: Init<State>,
  actions: T
) => {
  const stream = new Subject<Action<State>>();
  const initialState = init(stream);

  return class implements OnInit, OnDestroy {
    private sub: Subscription | null = null;
    actions = actions;
    stream = stream;

    state: Observable<State> = this.stream.pipe(
      scan((state, action) => action(state, this.stream), initialState),
      startWith(initialState),
      tap(console.log)
    );

    constructor(private ref: ChangeDetectorRef | undefined) {}

    ngOnInit(): void {
      this.sub = this.state.subscribe(() => this.ref?.detectChanges());
    }

    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
  };
};

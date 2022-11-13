import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Observable, scan, startWith, Subject, Subscription, tap } from 'rxjs';

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

export const createActions =
  <State>() =>
  <A extends ActionRecord<State>>(actionRecord: A): A =>
    actionRecord;

export const beastRx = <State, T extends ActionRecord<State>>(
  init: Init<State>,
  actions: T
) => {
  const changes = new Subject<Action<State>>();
  const initialState = init(changes);

  return class {
    actions = actions;
    changes = changes;

    state: Observable<State> = changes.pipe(
      scan((state, action) => action(state, this.changes), initialState),
      startWith(initialState),
      tap(console.log)
    );
  };
};

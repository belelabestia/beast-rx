import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, scan, startWith, Subject, Subscription, tap } from 'rxjs';

export interface Action<State> {
  (state: State): State;
}

export interface ActionFactory<State> {
  (value: any): Action<State>;
}

export interface ActionRecord<State> {
  [key: string]: Action<State> | ActionFactory<State>;
}

export interface Init<State> {
  (actions: Subject<Action<State>>): State;
}

export const createActions = <State, A extends ActionRecord<State>>(
  actionRecord: A
): A => actionRecord;

export const beastRx = <State, T extends ActionRecord<State>>(
  init: Init<State>,
  actions: T
) => {
  const action = new Subject<Action<State>>();
  const initialState = init(action);

  return class implements OnInit, OnDestroy {
    private sub: Subscription | null = null;
    actions = actions;
    action = action;

    state: Observable<State> = this.action.pipe(
      scan((state, action) => action(state), initialState),
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

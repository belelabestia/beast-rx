import { scan, startWith, Subject, tap } from 'rxjs';

export interface Action<State> {
  (state: State): State;
}

export interface ActionFactory<State> {
  (value: any): Action<State>;
}

export interface ActionRecord<State> {
  [key: string]: Action<State> | ActionFactory<State>;
}

export const createActions = <State, A extends ActionRecord<State>>(
  actionRecord: A
): A => actionRecord;

export const beastRx = <State, T>(initialState: State, actions: T) =>
  class {
    actions = actions;
    action = new Subject<Action<State>>();

    state = this.action.pipe(
      scan((state, action) => action(state), initialState),
      startWith(initialState),
      tap(console.log)
    );
  };

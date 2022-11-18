import { Injectable } from '@angular/core';
import { Action, ActionFactory } from 'src/beast-rx/core';

export interface CounterState {
  incrementBy: number;
  currentValue: number;
}

const initialState: CounterState = {
  incrementBy: 1,
  currentValue: 0,
};

@Injectable()
export class CounterService {
  incrementBy: ActionFactory<CounterState, CounterService> =
    (event: Event) => () => ({
      incrementBy: (event.target as HTMLInputElement).valueAsNumber,
    });

  increment: Action<CounterState, CounterService> = ({ state }) => ({
    currentValue: state.currentValue + state.incrementBy,
  });

  reset: Action<CounterState, CounterService> = () => initialState;
}

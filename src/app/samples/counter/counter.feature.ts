import { Injectable } from '@angular/core';
import { Action, ActionFactory } from 'src/beast-rx/interfaces';
import { CounterState, initialState } from './counter.state';

@Injectable()
export class CounterFeature {
  incrementBy: ActionFactory<CounterState, CounterFeature> =
    (event: Event) => () => ({
      incrementBy: (event.target as HTMLInputElement).valueAsNumber,
    });

  increment: Action<CounterState, CounterFeature> = ({ state }) => ({
    currentValue: state.currentValue + state.incrementBy,
  });

  reset: Action<CounterState, CounterFeature> = () => initialState;
}

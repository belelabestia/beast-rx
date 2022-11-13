import { Component } from '@angular/core';
import { beastRx, createActions } from 'src/beast-rx/core';

interface State {
  incrementBy: number;
  currentValue: number;
}

const initialState: State = {
  incrementBy: 1,
  currentValue: 0,
};

const actions = createActions<State>()({
  incrementBy: (event: Event) => (state: State) => ({
    ...state,
    incrementBy: (event.target as HTMLInputElement).valueAsNumber,
  }),
  increment: (state: State) => ({
    ...state,
    currentValue: state.currentValue + state.incrementBy,
  }),
  reset: () => initialState,
});

@Component({
  selector: '[counter]',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent extends beastRx(actions.reset, actions) {}

import { Component } from '@angular/core';
import { beastRx, createActions, Init } from 'src/beast-rx/core';

interface State {
  incrementBy: number;
  currentValue: number;
}

const initialState: State = {
  incrementBy: 1,
  currentValue: 0,
};

const init: Init<State> = (_) => initialState;

const actionRecord = {
  incrementBy: (event: Event) => (state: State) => ({
    ...state,
    incrementBy: Number((event as InputEvent).data),
  }),
  increment: (state: State) => ({
    ...state,
    currentValue: state.currentValue + state.incrementBy,
  }),
  reset: (_: State) => initialState,
} as const;

const actions = createActions<State, typeof actionRecord>(actionRecord);

@Component({
  selector: '[counter]',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent extends beastRx(init, actions) {}

export interface CounterState {
  incrementBy: number;
  currentValue: number;
}

export const initialState: CounterState = {
  incrementBy: 1,
  currentValue: 0,
};

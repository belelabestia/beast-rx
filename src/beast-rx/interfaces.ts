import { BeastRx } from './core';

export interface Init<State, Service> {
  (rx: BeastRx<State, Service>): Action<State, Service>;
}

export interface InitArgs<State, Service> {
  rx: BeastRx<State, Service>;
}

export interface ActionArgs<State, Service> {
  state: State;
  rx: BeastRx<State, Service>;
}

export interface Action<State, Service> {
  (args: ActionArgs<State, Service>): Partial<State>;
}

export interface ActionFactory<State, Service> {
  (value: any): Action<State, Service>;
}

export interface ActionRecord<State, Service> {
  [key: string]: ActionFactory<State, Service>;
}

export interface Constructor<T> {
  new (...args: any[]): T;
}

export interface Storage<State> {
  [key: string]: State;
}

import { CounterState } from './samples/counter/counter.state';
import { EditFormState } from './samples/edit-form/edit-form.state';

export interface AppCtx {
  counter: CounterState;
  editForm: EditFormState;
}

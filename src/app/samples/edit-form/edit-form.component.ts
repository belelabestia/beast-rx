import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { beastRx, createActions, Init } from 'src/beast-rx/core';
import { Form, getForm, viewForm, ViewForm } from './form-repository';

const initialForm: ViewForm = {
  name: '',
  surname: '',
  birth: null,
  email: '',
} as const;

interface State {
  type: 'loading' | 'loaded' | 'reset';
  form: ViewForm;
}

const init: Init<State> = (stream) => {
  getForm().subscribe((form) => stream.next(actions.loaded(form)));

  return {
    type: 'loading',
    form: initialForm,
  };
};

const actions = createActions<State>()({
  reset: (): State => ({ type: 'reset', form: initialForm }),
  loaded:
    (form: Form) =>
    (_: State): State => ({
      type: 'loaded',
      form: viewForm(form) ?? initialForm,
    }),
});

@Component({
  selector: '[edit-form]',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormComponent extends beastRx(init, actions) {
  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }
}

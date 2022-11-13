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

type State =
  | {
      type: 'loading';
      form: ViewForm;
    }
  | {
      type: 'loaded';
      form: ViewForm;
    };

const init: Init<State> = (action) => {
  getForm().subscribe((form) => action.next(actions.loaded(form)));

  return {
    type: 'loading',
    form: initialForm,
  };
};

const actionRecord = {
  loaded:
    (form: Form) =>
    (_: State): State => ({
      type: 'loaded',
      form: viewForm(form) ?? initialForm,
    }),
};

const actions = createActions<State, typeof actionRecord>(actionRecord);

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

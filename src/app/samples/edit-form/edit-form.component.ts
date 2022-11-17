import { Component } from '@angular/core';
import { createActions, Init, Changes } from 'src/beast-rx/core';
import {
  form,
  Form,
  getForm,
  saveForm,
  viewForm,
  ViewForm,
} from './form-repository';

const initialForm: ViewForm = {
  name: '',
  surname: '',
  birth: null,
  email: '',
} as const;

interface State {
  type: 'loading' | 'loaded' | 'reset' | 'saving' | 'saved' | 'updated';
  form: ViewForm;
}

const actions = createActions<State>()({
  reset: (): State => ({ type: 'reset', form: initialForm }),
  load: (_, changes): State => {
    getForm().subscribe((form) => changes.next(actions.loaded(form)));

    return {
      type: 'loading',
      form: initialForm,
    };
  },
  loaded: (form: Form) => (): State => ({
    type: 'loaded',
    form: viewForm(form) ?? initialForm,
  }),
  save: (state: State, changes: Changes<State>): State => {
    const f = form(state.form);
    if (f !== null) saveForm(f).subscribe(() => changes.next(actions.saved));

    return {
      type: 'saving',
      form: state.form,
    };
  },
  saved: (state: State): State => ({
    type: 'saved',
    form: state.form,
  }),
  form:
    (data: Partial<ViewForm>) =>
    (state: State): State => ({
      type: 'updated',
      form: { ...state.form, ...data },
    }),
});

const init: Init<State> = (changes) => actions.load(null!, changes);

@Component({
  selector: '[edit-form]',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent /* extends beastRx(init, actions) */ {
  inputString(event: Event): string | undefined {
    return (event.target as HTMLInputElement).value ?? undefined;
  }

  inputDate(event: Event): Date | undefined {
    return (event.target as HTMLInputElement).valueAsDate ?? undefined;
  }
}

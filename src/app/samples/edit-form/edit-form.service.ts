import { Injectable } from '@angular/core';
import { Action, ActionFactory } from 'src/beast-rx/core';
import {
  EditFormRepository,
  form,
  Form,
  viewForm,
  ViewForm,
} from './form-repository';

export interface EditFormState {
  type: 'loading' | 'loaded' | 'reset' | 'saving' | 'saved' | 'updated';
  form: ViewForm;
}

const initialForm: ViewForm = {
  name: '',
  surname: '',
  birth: null,
  email: '',
} as const;

@Injectable()
export class EditFormService {
  constructor(private repo: EditFormRepository) {}

  reset: Action<EditFormState, EditFormService> = () => ({
    type: 'reset',
    form: initialForm,
  });

  load: Action<EditFormState, EditFormService> = ({ rx }) => {
    this.repo
      .getForm()
      .subscribe((form) => rx.changes.next(rx.service.loaded(form)));

    return {
      type: 'loading',
      form: initialForm,
    };
  };

  loaded: ActionFactory<EditFormState, EditFormService> =
    (form: Form) => () => ({
      type: 'loaded',
      form: viewForm(form) ?? initialForm,
    });

  save: Action<EditFormState, EditFormService> = ({ state, rx }) => {
    const f = form(state.form);
    if (f !== null)
      this.repo.saveForm(f).subscribe(() => rx.changes.next(rx.service.saved));

    return { type: 'saving' };
  };

  saved: Action<EditFormState, EditFormService> = () => ({ type: 'saved' });

  form: ActionFactory<EditFormState, EditFormService> =
    (data: Partial<ViewForm>) =>
    ({ state }): EditFormState => ({
      type: 'updated',
      form: { ...state.form, ...data },
    });
}

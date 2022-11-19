import { Injectable } from '@angular/core';
import { Action, ActionFactory } from 'src/beast-rx/interfaces';
import { EditFormState, Form, initialForm, ViewForm } from './edit-form.state';
import { EditFormRepository, form, viewForm } from './form-repository';

@Injectable()
export class EditFormFeature {
  constructor(private repo: EditFormRepository) {}

  reset: Action<EditFormState, EditFormFeature> = () => ({
    type: 'reset',
    form: initialForm,
  });

  load: Action<EditFormState, EditFormFeature> = ({ rx }) => {
    this.repo
      .getForm()
      .subscribe((form) => rx.actions.next(rx.feature.loaded(form)));

    return {
      type: 'loading',
      form: initialForm,
    };
  };

  loaded: ActionFactory<EditFormState, EditFormFeature> =
    (form: Form) => () => ({
      type: 'loaded',
      form: viewForm(form) ?? initialForm,
    });

  save: Action<EditFormState, EditFormFeature> = ({ state, rx }) => {
    const f = form(state.form);
    if (f !== null)
      this.repo.saveForm(f).subscribe(() => rx.actions.next(rx.feature.saved));

    return { type: 'saving' };
  };

  saved: Action<EditFormState, EditFormFeature> = () => ({ type: 'saved' });

  form: ActionFactory<EditFormState, EditFormFeature> =
    (data: Partial<ViewForm>) =>
    ({ state }): EditFormState => ({
      type: 'updated',
      form: { ...state.form, ...data },
    });
}

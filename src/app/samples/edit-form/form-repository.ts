import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { Creator } from 'src/utils/brand';
import { nonEmptyString, email } from 'src/utils/validators';
import { Form, ViewForm } from './edit-form.state';

export interface RepoAction<A, B> {
  (a: A): Observable<B>;
}

export const viewForm: Creator<Form, ViewForm> = (form) => {
  if (form.email === null || form.name === null || form.surname === null)
    return null;

  return form as ViewForm;
};

export const form: Creator<ViewForm, Form> = (viewForm) => {
  const form: Form = {
    name: nonEmptyString(viewForm.name),
    surname: nonEmptyString(viewForm.surname),
    email: email(viewForm.email),
  };

  if (form.email === null || form.name === null || form.surname === null)
    return null;

  return form;
};

const delay = 2000 as const;

let mock: Form = {
  name: nonEmptyString('Mario'),
  surname: nonEmptyString('Rossi'),
  email: email('rossi.m@gmail.com'),
};

@Injectable({ providedIn: 'root' })
export class EditFormRepository {
  getForm: RepoAction<void, Form> = () => timer(delay).pipe(map(() => mock));

  saveForm: RepoAction<Form, void> = (form: Form) =>
    timer(delay).pipe(
      map(() => {
        mock = form;
      })
    );
}

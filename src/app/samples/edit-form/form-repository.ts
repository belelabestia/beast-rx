import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { Creator } from 'src/beast-rx/brand';
import {
  nonEmptyString,
  Email,
  NonEmptyString,
  email,
} from 'src/beast-rx/validators';

export interface ViewForm {
  name: string;
  surname: string;
  birth: Date | null;
  email: string;
}

export interface Form {
  name: NonEmptyString | null;
  surname: NonEmptyString | null;
  birth: Date | null;
  email: Email | null;
}

export interface RepoAction<A, B> {
  (a: A): Observable<B>;
}

export const viewForm: Creator<Form, ViewForm> = (form) => {
  if (
    form.birth === null ||
    form.email === null ||
    form.name === null ||
    form.surname === null
  )
    return null;

  return form as ViewForm;
};

export const form: Creator<ViewForm, Form> = (viewForm) => {
  const form: Form = {
    name: nonEmptyString(viewForm.name),
    surname: nonEmptyString(viewForm.surname),
    birth: viewForm.birth,
    email: email(viewForm.email),
  };

  if (
    form.birth === null ||
    form.email === null ||
    form.name === null ||
    form.surname === null
  )
    return null;

  return form;
};

const delay = 2000 as const;

let mock: Form = {
  name: nonEmptyString('Mario'),
  surname: nonEmptyString('Rossi'),
  birth: new Date('1991-03-21'),
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

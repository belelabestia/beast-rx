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

const delay = 5000 as const;

const mock: Form = {
  name: nonEmptyString('Mario'),
  surname: nonEmptyString('Rossi'),
  birth: new Date('1991-03-21'),
  email: email('rossi.m@gmail.com'),
};

export const getForm: RepoAction<void, Form> = () =>
  timer(delay).pipe(map(() => mock));

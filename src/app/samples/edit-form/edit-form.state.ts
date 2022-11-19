import { Email, NonEmptyString } from 'src/utils/validators';

export interface EditFormState {
  type: 'loading' | 'loaded' | 'reset' | 'saving' | 'saved' | 'updated';
  form: ViewForm;
}

export const initialForm: ViewForm = {
  name: '',
  surname: '',
  email: '',
} as const;

export interface ViewForm {
  name: string;
  surname: string;
  email: string;
}

export interface Form {
  name: NonEmptyString | null;
  surname: NonEmptyString | null;
  email: Email | null;
}

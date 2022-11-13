import { state } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { beastRx, createActions, Init, Stream } from 'src/beast-rx/core';
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
  load: (_, stream): State => {
    getForm().subscribe((form) => stream.next(actions.loaded(form)));

    return {
      type: 'loading',
      form: initialForm,
    };
  },
  loaded: (form: Form) => (): State => ({
    type: 'loaded',
    form: viewForm(form) ?? initialForm,
  }),
  save: (state: State, stream: Stream<State>): State => {
    const f = form(state.form);
    if (f !== null) saveForm(f).subscribe(() => stream.next(actions.saved));

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

const init: Init<State> = (stream) => actions.load(null!, stream);

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

  inputString(event: Event): string | undefined {
    return (event.target as HTMLInputElement).value ?? undefined;
  }

  inputDate(event: Event): Date | undefined {
    return (event.target as HTMLInputElement).valueAsDate ?? undefined;
  }
}

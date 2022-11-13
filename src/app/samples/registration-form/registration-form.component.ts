import { Component } from '@angular/core';
import { beastRx, createActions } from 'src/beast-rx/core';

interface State {
  name: string;
  surname: string;
  birth: Date | null;
  email: string;
}

const initialState: State = {
  name: '',
  surname: '',
  birth: null,
  email: '',
};

const actionRecord = {};

const actions = createActions<State, typeof actionRecord>(actionRecord);

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent extends beastRx(initialState) {}

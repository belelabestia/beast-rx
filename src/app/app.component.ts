import { Component } from '@angular/core';
import { BeastCtx, provideLogger, Storage } from 'src/beast-rx/core';
import { CounterState } from './samples/counter/counter.service';
import { EditFormState } from './samples/edit-form/edit-form.service';

export interface AppState {
  counter: CounterState;
  editForm: EditFormState;
}

@Component({
  selector: '[app]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BeastCtx<AppState>, provideLogger(console.debug)],
})
export class AppComponent {}

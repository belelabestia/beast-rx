import { Component } from '@angular/core';
import { BeastCtx, provideRootBeast } from 'src/beast-rx/core';
import { CounterState } from './samples/counter/counter.service';
import { EditFormState } from './samples/edit-form/edit-form.service';

export interface AppCtx {
  counter: CounterState;
  editForm: EditFormState;
}

@Component({
  selector: '[app]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [provideRootBeast(console.debug, BeastCtx)],
})
export class AppComponent {}

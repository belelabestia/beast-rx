import { Component, Inject } from '@angular/core';
import { BeastCtx, LOGGER, Storage } from 'src/beast-rx/core';
import { CounterState } from '../counter/counter.service';
import { EditFormState } from '../edit-form/edit-form.service';

interface AppState extends Storage<CounterState | EditFormState> {
  counter: CounterState;
  editForm: EditFormState;
}

@Component({
  selector: '[summary]',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  constructor(protected ctx: BeastCtx<AppState>) {}

  text(state: AppState): string {
    return JSON.stringify(state, null, '  ');
  }
}

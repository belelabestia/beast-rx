import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { provideStorage, STORAGE } from 'src/beast-rx/core';
import { CounterState } from '../counter/counter.service';
import { EditFormState } from '../edit-form/edit-form.service';

export interface AppState {
  counter: CounterState;
  editForm: EditFormState;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [provideStorage(new Subject<AppState>())],
})
export class SummaryComponent {
  constructor(
    @Inject(STORAGE) protected storage: Subject<Record<string, AppState>>
  ) {}

  text(state: AppState) {
    return JSON.stringify(state);
  }
}

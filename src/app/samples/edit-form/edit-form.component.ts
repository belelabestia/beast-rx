import { Component } from '@angular/core';
import { AppCtx } from 'src/app/app.ctx';
import { BeastRx } from 'src/beast-rx/core';
import { provideBeastRx } from 'src/beast-rx/providers';
import { EditFormFeature } from './edit-form.feature';
import { EditFormState } from './edit-form.state';

@Component({
  selector: '[edit-form]',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
  providers: provideBeastRx<EditFormState, EditFormFeature, AppCtx>(
    (rx) => rx.feature.load,
    EditFormFeature,
    'editForm'
  ),
})
export class EditFormComponent {
  inputString(event: Event): string | undefined {
    return (event.target as HTMLInputElement).value ?? undefined;
  }

  inputDate(event: Event): Date | undefined {
    return (event.target as HTMLInputElement).valueAsDate ?? undefined;
  }

  constructor(protected rx: BeastRx<EditFormState, EditFormFeature>) {}
}

import { Component } from '@angular/core';
import { AppCtx } from 'src/app/app.component';
import { BeastRx, provide } from 'src/beast-rx/core';
import { EditFormService, EditFormState } from './edit-form.service';

@Component({
  selector: '[edit-form]',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
  providers: provide<EditFormState, EditFormService, AppCtx>(
    (rx) => rx.service.load,
    EditFormService,
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

  constructor(protected rx: BeastRx<EditFormState, EditFormService>) {}
}

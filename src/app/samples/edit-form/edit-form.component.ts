import { Component } from '@angular/core';
import { BeastRx, provide } from 'src/beast-rx/core';
import { EditFormService, EditFormState } from './edit-form.service';

@Component({
  selector: '[edit-form]',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
  providers: provide<EditFormState, EditFormService>(
    (rx) => rx.service.load,
    EditFormService
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

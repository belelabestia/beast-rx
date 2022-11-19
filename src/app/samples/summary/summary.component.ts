import { Component, Inject } from '@angular/core';
import { AppCtx } from 'src/app/app.ctx';
import { BeastCtx } from 'src/beast-rx/core';
import { CONTEXT } from 'src/beast-rx/injection-tokens';

@Component({
  selector: '[summary]',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  constructor(@Inject(CONTEXT) protected ctx: BeastCtx<AppCtx>) {}

  text(state: AppCtx): string {
    return JSON.stringify(state, null, '  ');
  }
}

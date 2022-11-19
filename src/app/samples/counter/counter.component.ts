import { Component } from '@angular/core';
import { AppCtx } from 'src/app/app.component';
import { BeastRx, provide } from 'src/beast-rx/core';
import { CounterService, CounterState } from './counter.service';

@Component({
  selector: '[counter]',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: provide<CounterState, CounterService, AppCtx>(
    (rx) => rx.service.reset,
    CounterService,
    'counter'
  ),
})
export class CounterComponent {
  constructor(protected rx: BeastRx<CounterState, CounterService>) {}
}

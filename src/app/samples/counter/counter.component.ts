import { Component } from '@angular/core';
import { BeastRx, provide } from 'src/beast-rx/core';
import { CounterService, CounterState } from './counter.service';

@Component({
  selector: '[counter]',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: provide<CounterState, CounterService>(
    (rx) => rx.service.reset,
    CounterService
  ),
})
export class CounterComponent {
  constructor(protected rx: BeastRx<CounterState, CounterService>) {}
}

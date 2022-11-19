import { Component } from '@angular/core';
import { AppCtx } from 'src/app/app.ctx';
import { BeastRx } from 'src/beast-rx/core';
import { provideBeastRx } from 'src/beast-rx/providers';
import { CounterFeature } from './counter.feature';
import { CounterState } from './counter.state';

@Component({
  selector: '[counter]',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: provideBeastRx<CounterState, CounterFeature, AppCtx>(
    (rx) => rx.feature.reset,
    CounterFeature,
    'counter'
  ),
})
export class CounterComponent {
  constructor(protected rx: BeastRx<CounterState, CounterFeature>) {}
}

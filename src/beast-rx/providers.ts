import { Provider } from '@angular/core';
import { BeastCtx, BeastRx } from './core';
import {
  CONTEXT,
  CONTEXT_KEY,
  FEATURE,
  INIT,
  LOGGER,
} from './injection-tokens';
import { Constructor, Init } from './interfaces';

export const provideBeastRx = <State, Service, Context = {}>(
  init: Init<State, Service>,
  featureService: Constructor<Service>,
  contextKey?: keyof Context
): Provider[] => [
  {
    provide: INIT,
    useValue: init,
  },
  {
    provide: FEATURE,
    useClass: featureService,
  },
  {
    provide: CONTEXT_KEY,
    useValue: contextKey ?? null,
  },
  BeastRx,
];

export const provideBeastCtx = (logger?: typeof console.log): Provider[] => [
  {
    provide: CONTEXT,
    useClass: BeastCtx,
  },
  ...(logger === undefined
    ? []
    : [
        {
          provide: LOGGER,
          useValue: logger,
        },
      ]),
];

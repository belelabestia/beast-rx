import { InjectionToken } from '@angular/core';
import { BeastCtx } from './core';
import { Action, ActionRecord } from './interfaces';

export const INIT = new InjectionToken<Action<any, any>>('INIT');
export const FEATURE = new InjectionToken<ActionRecord<any, any>>('FEATURE');

export const CONTEXT = new InjectionToken<BeastCtx<any> | null>('CONTEXT', {
  providedIn: 'root',
  factory: () => null,
});

export const CONTEXT_KEY = new InjectionToken<string>('STORAGE_KEY');

export const LOGGER = new InjectionToken<typeof console.log>('LOGGER', {
  providedIn: 'root',
  factory: () => console.log,
});

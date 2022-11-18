import {
  ChangeDetectorRef,
  Inject,
  Injectable,
  InjectionToken,
  Provider,
} from '@angular/core';
import {
  distinctUntilChanged,
  Observable,
  scan,
  startWith,
  Subject,
  tap,
} from 'rxjs';

export interface Init<State, Service> {
  (rx: BeastRx<State, Service>): Action<State, Service>;
}

export interface InitArgs<State, Service> {
  rx: BeastRx<State, Service>;
}

export interface ActionArgs<State, Service> {
  state: State;
  rx: BeastRx<State, Service>;
}

export interface Action<State, Service> {
  (args: ActionArgs<State, Service>): Partial<State>;
}

export interface ActionFactory<State, Service> {
  (value: any): Action<State, Service>;
}

export interface ActionRecord<State, Service> {
  [key: string]: ActionFactory<State, Service>;
}

export interface Constructor<T> {
  new (...args: any[]): T;
}

export interface Storage<State> {
  [key: string]: State;
}

export interface StorageSetter<State> {
  (state: State): Storage<State>;
}

export const INIT = new InjectionToken<Action<any, any>>('INIT');
export const SERVICE = new InjectionToken<ActionRecord<any, any>>('SERVICE');

export const STORAGE = new InjectionToken<Subject<any> | null>('STORAGE', {
  factory: () => null,
});

export const STORAGE_SETTER = new InjectionToken<string>('STORAGE_SETTER');

export const LOGGER = new InjectionToken<typeof console.log>('LOGGER', {
  factory: () => console.log,
});

export const createActions =
  <State, Service>() =>
  <A extends ActionRecord<State, Service>>(actionRecord: A): A =>
    actionRecord;

export const provide = <State, Service>(
  init: Init<State, Service>,
  service: Constructor<Service>,
  storageSetter: (storage: Storage<State>) => void,
  logger?: typeof console.log
): Provider[] => [
  {
    provide: INIT,
    useValue: init,
  },
  {
    provide: SERVICE,
    useClass: service,
  },
  {
    provide: LOGGER,
    useValue: logger,
  },
  {
    provide: STORAGE_SETTER,
    useValue: storageSetter,
  },
  BeastRx,
];

export const provideStorage = <State>(instance: Subject<State>): Provider => ({
  provide: STORAGE,
  useValue: instance,
});

@Injectable()
export class BeastRx<State, Service> {
  changes: Subject<Action<State, Service>>;
  state: Observable<State>;

  constructor(
    ref: ChangeDetectorRef,
    @Inject(INIT) init: Init<State, Service>,
    @Inject(SERVICE) public service: Service,
    @Inject(LOGGER) public log: typeof console.log,
    @Inject(STORAGE) public storage: Subject<Storage<State>> | null,
    @Inject(STORAGE_SETTER) public storageSetter: StorageSetter<State>
  ) {
    const changes = new Subject<Action<State, Service>>();

    const initialState = (
      init(this) as (args: InitArgs<State, Service>) => State
    )({ rx: this });

    this.changes = changes;

    this.state = changes.pipe(
      scan(
        (state, action) => ({ ...state, ...action({ state, rx: this }) }),
        initialState
      ),
      startWith(initialState),
      distinctUntilChanged(),
      tap((state) => this.storage?.next(this.storageSetter(state))),
      tap(() => setTimeout(() => ref.detectChanges())),
      tap((state) => this.log(state))
    );
  }
}

export const init =
  <State, Service>(state: State): ((_: ActionArgs<State, Service>) => State) =>
  () =>
    state;

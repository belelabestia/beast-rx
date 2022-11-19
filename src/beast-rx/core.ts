import {
  ApplicationRef,
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
  shareReplay,
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

export const INIT = new InjectionToken<Action<any, any>>('INIT');

export const FEATURE_SERVICE = new InjectionToken<ActionRecord<any, any>>(
  'FEATURE_SERVICE'
);

export const CONTEXT_KEY = new InjectionToken<string>('STORAGE_KEY');

export const LOGGER = new InjectionToken<typeof console.log>('LOGGER', {
  providedIn: 'root',
  factory: () => console.log,
});

export const createActions =
  <State, Service>() =>
  <A extends ActionRecord<State, Service>>(actionRecord: A): A =>
    actionRecord;

export const provide = <State, Service, Context>(
  init: Init<State, Service>,
  featureService: Constructor<Service>,
  contextKey: keyof Context
): Provider[] => [
  {
    provide: INIT,
    useValue: init,
  },
  {
    provide: FEATURE_SERVICE,
    useClass: featureService,
  },
  {
    provide: CONTEXT_KEY,
    useValue: contextKey,
  },
  BeastRx,
];

export const provideRootBeast = (
  logger: typeof console.log,
  rootContext?: Constructor<BeastCtx<any>>
): Provider[] => [
  {
    provide: LOGGER,
    useFactory: () => logger ?? console.log,
  },
  rootContext
    ? {
        provide: BeastCtx,
        useClass: rootContext,
      }
    : {
        provide: BeastCtx,
        useValue: null,
      },
];

@Injectable()
export class BeastRx<State, Service> {
  changes: Subject<Action<State, Service>>;
  state: Observable<State>;

  constructor(
    ref: ChangeDetectorRef,
    public ctx: BeastCtx<Storage<State>> | null,
    @Inject(INIT) init: Init<State, Service>,
    @Inject(FEATURE_SERVICE) public service: Service,
    @Inject(LOGGER) public log: typeof console.log,
    @Inject(CONTEXT_KEY) public field: string
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
      tap((state) => {
        this.log('BeastRx update: ', { state });

        setTimeout(() => {
          this.ctx?.dispatcher.next({ [this.field]: state });
          ref.detectChanges();
        });
      })
    );
  }
}

export const init =
  <State, Service>(state: State): ((_: ActionArgs<State, Service>) => State) =>
  () =>
    state;

@Injectable()
export class BeastCtx<State> {
  dispatcher = new Subject<State>();

  storage = this.dispatcher.pipe(
    scan((acc, next) => ({ ...acc, ...next }), {} as State),
    tap(() => setTimeout(() => this.ref.detectChanges())),
    tap((state) => this.log('BeastCtx update: ', { state }))
  );

  constructor(
    private ref: ChangeDetectorRef,
    @Inject(LOGGER) public log: typeof console.log
  ) {}
}

# BeastRx

This repo is a proof-of-concept/an MVP for a library that aims to make angular fully-reactive with a light API.

## API

Declare your state interface and an `Init<State>` function:

```ts
interface State {
  incrementBy: number;
  currentValue: number;
}

const initialState: State = {
  incrementBy: 1,
  currentValue: 0,
};

const init: Init<State> = (_) => initialState;
```

Declare and create your actions:

```ts
const actions = createActions<State>()({
  incrementBy: (event: Event) => (state: State) => ({
    ...state,
    incrementBy: Number((event as InputEvent).data),
  }),
  increment: (state: State) => ({
    ...state,
    currentValue: state.currentValue + state.incrementBy,
  }),
  reset: (_: State) => initialState,
});
```

Extend an Angular component with `beastRx` and pass a `ChangeDetectorRef` instance to the `super` constructor:

```ts
@Component({
  selector: "[edit-form]",
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormComponent extends beastRx(init, actions) {
  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }
}
```

## Known issues

- I don't like the `ChangeDetectorRef` dependency, or at least it should be completely handled by `beastRx`.
- The default strategy should always be `OnPush`; should probably wrap the Angular `Component` decorator instead of making a class factory function.
- I'd like to separate effects from state actions (and maybe find better naming for the actions).

# BeastRx

🎉 Welcome to the **BeastRx** repository 🎉

**BeastRx** is an ultra-light Angular library that enables _full reactivity_.

👍 **No mutable state**  
👍 **Smart change detection**  
👍 **Fully declarative**  
👍 **100% reactive**  
👍 **Only 150 lines of code**

---

## _Provide_ a root `BeastCtx`

## _Provide_ your BeastRx dependencies

Call the `provide` function passing the `init` function, the _Feature Service_ and the _Storage Key_.

> - The `init` function is just a function that returns the first _Action_ that will initialize state.
> - A _Feature Service_ is a simple class decorated with `@Injectable()`, in other words, an angular service that is not provided in root; it exposes all the _Actions_ or the _Action Factories_ that update state by returning a new state instance.
> - The _Context Key_ is the key that will be used to select the state from the root `BeastCtx`.

##

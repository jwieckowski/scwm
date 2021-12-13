import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    weights: Array(10).fill(0),
  },
  // actions that trigger store mutation
  actions: {
    changeWeights:
      (value, index) =>
      ({ setState, getState }) => {
        let copy = [...getState().weights];
        copy[index] = +value;

        setState({
          weights: copy,
        });
      },
    validateInput:
      () =>
      ({ getState }) => {
        if (getState().weights.some((weight) => weight === 0)) return 3;
        if (getState().weights.length !== new Set(getState().weights).size)
          return 2;
        if (getState().weights.some((weight) => weight < 10)) return 1;

        return 0;
      },
  },
  // optional, mostly used for easy debugging
  name: "SMART",
});

export const useSMART = createHook(Store);

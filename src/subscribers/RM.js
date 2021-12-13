import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    weights: Array(10).fill(0),
    targetSum: 55,
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
          return 1;

        const sum = getState().weights.reduce((s, val) => parseInt(s + val));
        return sum === getState().targetSum ? 0 : 2;
      },
  },
  // optional, mostly used for easy debugging
  name: "RM",
});

export const useRM = createHook(Store);

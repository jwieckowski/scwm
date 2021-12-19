import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    weights: Array(10).fill(0),
    sum: 0,
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
    calculateSum:
      () =>
      ({ setState, getState }) => {
        const sum = getState().weights.reduce((s, val) => parseInt(s + val));
        setState({
          sum: sum,
        });
      },
    validateInput:
      () =>
      ({ getState }) => {
        if (getState().weights.some((weight) => weight === 0)) return 4;
        if (getState().weights.some((weight) => weight < 0)) return 3;

        // 0 - equal 100
        // 1 - too low
        // 2 - too much
        return getState().sum === 100 ? 0 : getState().sum < 100 ? 1 : 2;
      },
  },
  // optional, mostly used for easy debugging
  name: "FPS",
});

export const useFPS = createHook(Store);

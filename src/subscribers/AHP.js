import { createStore, createHook } from "react-sweet-state";

const initialMatrix = Array(10)
  .fill(0)
  .map(() => new Array(10).fill(0));

for (let i = 0; i < 10; i++) {
  initialMatrix[i][i] = 1;
}

const initialPairs = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (j > i) {
      initialPairs.push([i, j]);
    }
  }
}

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    criteriaAmount: 10,
    matrix: initialMatrix,
    pairs: initialPairs,
    compareValue: "",
    currentPair: 0,
    betterCriterion: "",
  },
  // actions that trigger store mutation
  actions: {
    comparePair:
      () =>
      ({ setState, getState }) => {
        const value =
          +getState().betterCriterion === 0
            ? getState().compareValue
            : 1 / getState().compareValue;

        let copy = [...getState().matrix];
        copy[getState().pairs[getState().currentPair][0]][
          getState().pairs[getState().currentPair][1]
        ] = value;
        copy[getState().pairs[getState().currentPair][1]][
          getState().pairs[getState().currentPair][0]
        ] = 1 / value.toFixed(3);

        setState({
          matrix: copy,
          currentPair: getState().currentPair + 1,
          compareValue: "",
          betterCriterion: "",
        });
      },
    setCompareValue:
      (value) =>
      ({ setState }) => {
        setState({
          compareValue: value,
        });
      },
    setBetterCriterion:
      (criterion) =>
      ({ setState }) => {
        setState({
          betterCriterion: criterion,
        });
      },
  },
  // optional, mostly used for easy debugging
  name: "AHP",
});

export const useAHP = createHook(Store);

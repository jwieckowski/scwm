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

console.log(initialPairs[44]);

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    criteriaAmount: 10,
    matrix: initialMatrix,
    pairs: initialPairs,
    compareValue: 0,
    currentPair: 0,
  },
  // actions that trigger store mutation
  actions: {
    comparePair:
      () =>
      ({ setState, getState }) => {
        let copy = [...getState().matrix];
        copy[getState().pairs[getState().currentPair][0]][
          getState().pairs[getState().currentPair][1]
        ] = getState().compareValue;
        copy[getState().pairs[getState().currentPair][1]][
          getState().pairs[getState().currentPair][0]
        ] = +(1 / getState().compareValue).toFixed(3);

        setState({
          matrix: copy,
          currentPair: getState().currentPair + 1,
          compareValue: 0,
        });
      },
    setCompareValue:
      (value) =>
      ({ setState }) => {
        setState({
          compareValue: value,
        });
      },
  },
  // optional, mostly used for easy debugging
  name: "AHP",
});

export const useAHP = createHook(Store);

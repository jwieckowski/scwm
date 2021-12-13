import { createStore, createHook } from "react-sweet-state";
import axios from "axios";

const SERVER_URL = "https://infinite-dusk-14350.herokuapp.com";
// const SERVER_URL = "http://localhost:5000";

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    activeStep: 0,
    methodsRatings: Array(5).fill(0),
    weightsCorrect: Array(5).fill(false),
    name: "",
    modalVisible: false,
    message: "",
  },
  // actions that trigger store mutation
  actions: {
    nextStep:
      () =>
      ({ setState, getState }) => {
        setState({
          activeStep: getState().activeStep + 1,
        });
      },
    prevStep:
      () =>
      ({ setState, getState }) => {
        if (getState().activeStep === 0) return;
        setState({
          activeStep: getState().activeStep - 1,
        });
      },
    changeRatings:
      (value) =>
      ({ setState, getState }) => {
        let copy = [...getState().methodsRatings];
        copy[getState().activeStep] = value;
        setState({
          methodsRatings: copy,
        });
      },
    changeWeightsCorrectness:
      (status) =>
      ({ setState, getState }) => {
        let copy = [...getState().weightsCorrect];
        copy[getState().activeStep] = status === 0 ? true : false;

        setState({
          weightsCorrect: copy,
        });
      },
    setName:
      (name) =>
      ({ setState }) => {
        setState({
          name: name,
        });
      },
    setModalVisibility:
      (state) =>
      ({ setState }) => {
        setState({
          modalVisible: state,
        });
      },
    postFormData:
      (data) =>
      async ({ setState, getState }) => {
        const body = {
          ...data,
          name: getState().name,
        };

        axios
          .post(`${SERVER_URL}/weights`, body)
          .then((res) => {
            setState({
              messsage: `Dane zostały ${
                res.status === 201 ? "zapisane" : "zaktualizowane"
              }`,
            });
          })
          .catch((err) => {
            setState({
              messsage: "Wystąpił błąd przy zapisywaniu danych",
            });
          });
      },
  },
  // optional, mostly used for easy debugging
  name: "weights",
});

export const useWeightsState = createHook(Store);

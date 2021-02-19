import * as actions from "./actionTypes";
import axios from "../../axios-orders";

export const addIng = (name) => {
  return {
    type: actions.ADD_ING,
    payload: { ingName: name },
  };
};

export const removeIng = (name) => {
  return {
    type: actions.REMOVE_ING,
    payload: { ingName: name },
  };
};

const fetchIngs = (ingredients) => {
  return {
    type: actions.SET_INGS,
    ingredients: ingredients,
  };
};

const fetchIngsFailed = () => {
  return {
    type: actions.FETCH_INGS_FAILED,
  };
};

export const initIngs = () => {
  return (dispatch) => {
    axios
      .get(
        "https://myburger-97d2b-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => dispatch(fetchIngs(response.data)))
      .catch((err) => fetchIngsFailed());
  };
};

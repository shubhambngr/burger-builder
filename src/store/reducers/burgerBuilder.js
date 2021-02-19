import * as actions from "../actions/actionTypes";
import { updateObject } from "./utility";

const initState = {
  ingredients: null,
  totalPrice: 3,
  error: false,
};

const INGREDIENTS_PRICE = {
  salad: 0.25,
  cheese: 0.5,
  meat: 1.4,
  bacon: 0.7,
};

const addIng = (state, action) => {
  const newIng = {
    [action.payload.ingName]: state.ingredients[action.payload.ingName] + 1,
  };
  const updatedIngs = updateObject(state.ingredients, newIng);
  const newState = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload.ingName],
  };
  return updateObject(state, newState);
};

const removeIng = (state, action) => {
  const newIngr = {
    [action.payload.ingName]: state.ingredients[action.payload.ingName] - 1,
  };
  const updatedIngrs = updateObject(state.ingredients, newIngr);
  const newSt = {
    ingredients: updatedIngrs,
    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload.ingName],
  };
  return updateObject(state, newSt);
};

const setIng = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: initState.totalPrice,
    error: false,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.ADD_ING:
      return addIng(state, action);
    case actions.REMOVE_ING:
      return removeIng(state, action);
    case actions.SET_INGS:
      return setIng(state, action);
    case actions.FETCH_INGS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;

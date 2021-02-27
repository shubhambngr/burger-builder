import * as actions from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.payload, {
    id: action.payload.id,
    orderData: action.payload.orderData,
  });
  return updateObject(state, {
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actions.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });
    case actions.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actions.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });
    case actions.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case actions.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { loading: false, orders: action.orders });
    case actions.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false, error: action.err });
    default:
      return state;
  }
};

export default reducer;

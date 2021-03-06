import * as actions from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseInit = () => {
  return {
    type: actions.PURCHASE_INIT,
  };
};

const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actions.PURCHASE_BURGER_SUCCESS,
    payload: { id: id, orderData: data },
  };
};

const purchaseBurgerFail = (error) => {
  return {
    type: actions.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actions.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

const fetchOrdersStart = () => {
  return {
    type: actions.FETCH_ORDERS_START,
  };
};

const fetchOrdersSuccess = (orders) => {
  return {
    type: actions.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

const fetchOrdersFail = (err) => {
  return {
    type: actions.FETCH_ORDERS_FAIL,
    error: err,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};

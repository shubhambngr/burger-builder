import * as actions from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authInit: false,
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.AUTH_INIT:
      return updateObject(state, { authInit: true });
    case actions.AUTH_START:
      return authStart(state, action);
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actions.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actions.AUTH_LOGOUT:
      return updateObject(state, { token: null, userId: null });
    default:
      return state;
  }
};

export default reducer;

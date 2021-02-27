import axios from "axios";

import * as actions from "./actionTypes";

const apiKey = process.env.REACT_APP_AUTH_API_KEY;

const authInit = () => {
  return {
    type: actions.AUTH_INIT,
  };
};

const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

const authFail = (err) => {
  return {
    type: actions.AUTH_FAIL,
    error: err,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actions.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, time * 1000);
  };
};

export const auth = (email, pass, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: pass,
      returnSecureToken: true,
    };
    let url = isSignUp
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
    dispatch(authInit());
  };
};

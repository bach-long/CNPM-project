import actionTypes from "./actionType";
import { toast } from "react-toastify";

import socket from "../../component/Content/socket";

export const loginByJwt = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      var status;
      var ojData = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      return fetch("http://127.0.0.1:5000/api/auth/me", ojData)
        .then(function (response) {
          status = response.status;
          return response.json();
        })
        .then(function (res) {
          if (status === 200) {
            dispatch(loginByJwtSuccess(res));
          } else {
            dispatch(loginByJwtFailed());
          }
        });
    } catch (err) {
      console.error("LOGIN BY JWT ERR", err);
      dispatch(loginByJwtFailed());
    }
  };
};

export const loginByJwtSuccess = (infoUser) => {
  return {
    type: actionTypes.LOGIN_BY_JWT_SUCCESS,
    payload: infoUser,
  };
};

export const loginByJwtFailed = () => {
  return {
    type: actionTypes.LOGIN_BY_JWT_FAILED,
  };
};

export const user = (infoUser) => {
  return {
    type: "LOGIN",
    payload: infoUser,
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let status;
      var ojData = {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        Authorization: `Bearer ${token}`,
        body: JSON.stringify(data),
      };
      await fetch("http://127.0.0.1:5000/api/auth/login", ojData)
        .then(function (response) {
          status = response.status;
          return response.json();
        })
        .then(function (res) {
          if (status === 200) {
            localStorage.setItem("token", res.token);
            socket.emit("online", res.user);
            dispatch(loginSuccess(res.user));
            toast.success("LOGIN SUCCESS");
          } else {
            toast.error("ERR: " + res.errors.message);
            dispatch(loginFailed(res.errors));
          }
        });
    } catch (err) {
      console.error("LOGIN ERR", err);
      toast.error("LOGIN FAILED");
      dispatch(loginByJwtFailed());
    }
  };
};

export const loginSuccess = (infoUser) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: infoUser,
  };
};

export const loginFailed = (data) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    data: data,
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      localStorage.removeItem("token");
      var status;
      var ojData = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      await fetch("http://127.0.0.1:5000/api/auth/logout", ojData)
        .then(function (response) {
          status = response.status;
          return response.json();
        })
        .then(function (res) {
          if (status === 200) {
            toast.success("LOGOUT SUCCESS");
            dispatch({ type: actionTypes.LOGOUT_SUCCESS });
          } else {
            dispatch({ type: actionTypes.LOGOUT_FAILED });
          }
        });
    } catch (err) {
      console.error("LOGOUT ERR", err);
      dispatch({ type: actionTypes.LOGOUT_FAILED });
    }
  };
};

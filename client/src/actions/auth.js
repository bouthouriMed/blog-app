import axios from "axios";
import { toast } from "react-toastify";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_BLOGS,
} from "./type";

import setAuthToken from "../utils/setAuthToken";

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/users");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register a user
export const register = (
  firstname,
  lastname,
  username,
  address,
  email,
  password,
  roles
) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/signup", {
      firstname,
      lastname,
      username,
      address,
      email,
      password,
      roles,
    });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;

    if (error) {
      toast.error(error);
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const login = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/signin", { username, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.error;

    if (error) {
      toast.error(error);
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout user
export const logout = (history) => (dispatch) => {
  try {
    dispatch({
      type: CLEAR_BLOGS,
    });

    dispatch({
      type: LOGOUT,
    });

    history.push("/");
  } catch (err) {
    console.log(err);
  }
};

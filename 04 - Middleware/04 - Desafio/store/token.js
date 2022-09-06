import { getLocalStorageItem } from "../helper/getLocalStorage.js";

//Constantes
const TOKEN_FETCH_START = "token/FETCH_START";
const TOKEN_FETCH_SUCCESS = "token/FETCH_SUCCESS";
const TOKEN_FETCH_ERROR = "token/FETCH_ERROR";

//Actions Functions
const fetch_start = () => {
  return { type: TOKEN_FETCH_START };
};

const fetch_success = (payload) => {
  return { type: TOKEN_FETCH_SUCCESS, payload, localStorage: "token-data" };
};

const fetch_error = (payload) => {
  return { type: TOKEN_FETCH_ERROR, payload };
};

export const token_fetch = (user) => async (dispatch) => {
  try {
    dispatch(fetch_start());
    const response = await fetch(
      "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const { token } = await response.json();
    dispatch(fetch_success(token));
  } catch (error) {
    dispatch(fetch_error(error.message));
  }
};

//Initial State
const initialState = {
  loading: false,
  data: getLocalStorageItem("token-data", null),
  error: null,
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_FETCH_START:
      return { ...state, loading: true };

    case TOKEN_FETCH_SUCCESS:
      return { data: action.payload, loading: true };

    case TOKEN_FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

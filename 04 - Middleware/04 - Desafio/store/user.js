//Constantes
const USER_FETCH_STARTED = "user/FETCH_STARTED";
const USER_FETCH_SUCCESS = "user/FETCH_SUCCESS";
const USER_FETCH_FAILED = "user/FETCH_FAILED";

//Action Functions

const fetch_started = () => ({ type: USER_FETCH_STARTED });
const fetch_successed = (payload) => ({
  type: USER_FETCH_SUCCESS,
  payload,
});
const fetch_failed = (payload) => ({ type: USER_FETCH_FAILED, payload });

export const fetch_user = (token) => async (dispatch) => {
  try {
    dispatch(fetch_started());
    const response = await fetch("https://dogsapi.origamid.dev/json/api/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer" + token,
      },
    });
    const data = await response.json();
    dispatch(fetch_successed(data));
  } catch (error) {
    dispatch(fetch_failed(error.message));
  }
};
//Estado inicial
const inicialState = {
  data: null,
  loading: false,
  error: null,
};

export const userReducer = (state = inicialState, action) => {
  switch (action.type) {
    case USER_FETCH_STARTED:
      return { ...state, loading: true };
    case USER_FETCH_SUCCESS:
      return { data: action.payload, loading: false, error: null };
    case USER_FETCH_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

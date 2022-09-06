const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

const fetch_start = () => {
  return { type: FETCH_START };
};

const fetch_success = (payload, localStorage) => {
  return { type: FETCH_SUCCESS, payload, localStorage };
};

const fetch_error = (payload) => {
  return { type: FETCH_ERROR, payload };
};

const hasStorageValue = (key, initial) => {
  try {
    const data = window.localStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return initial;
  }
};

const initialState = {
  loading: false,
  data: hasStorageValue("data", null),
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

const localStorage = (store) => (next) => (action) => {
  const result = next(action);
  if (action.localStorage !== undefined) {
    window.localStorage.setItem(
      action.localStorage,
      JSON.stringify(action.payload)
    );
  }
  return result;
};

const fetchUrl = (url) => {
  return async (dispatch) => {
    try {
      dispatch(fetch_start());
      const data = await fetch(url).then((r) => r.json());
      dispatch(fetch_success(data, "data"));
    } catch (erro) {
      dispatch(fetch_error(erro));
    }
  };
};

const { applyMiddleware, compose } = Redux;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage));
const store = Redux.createStore(reducer, enhancer);

const state = store.getState();
if (state.data === null) {
  store.dispatch(fetchUrl("https://dogsapi.origamid.dev/json/api/photo"));
}

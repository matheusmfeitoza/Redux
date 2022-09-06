import { store } from "./store/configureStore.js";
import { token_fetch } from "./store/token.js";
import { fetch_user } from "./store/user.js";

const userApi = { username: "dog", password: "dog" };

const login = async (user) => {
  let state = store.getState();
  if (state.tokenReducer.data === null) {
    await store.dispatch(token_fetch(user));
    state = store.getState();
  }
  await store.dispatch(fetch_user(state.tokenReducer.data));
};

login(userApi);

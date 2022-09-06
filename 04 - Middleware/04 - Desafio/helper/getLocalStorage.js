export const getLocalStorageItem = (key, initial) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch {
    return initial;
  }
};

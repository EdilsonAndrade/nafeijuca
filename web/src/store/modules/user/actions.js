export const saveSuccess = data => {
  return {
    type: '@user/SAVE_SUCCESS',
    payload: data,
  };
};

export const loadSuccess = data => {
  return {
    type: '@user/LOAD_SUCCESS',
    payload: data,
  };
};

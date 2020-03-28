export const saveSuccess = data => {
  return {
    type: '@store/SAVE_SUCCESS',
    payload: data,
  };
};

export const loadSuccess = data => {
  return {
    type: '@store/LOAD_SUCCESS',
    payload: data,
  };
};

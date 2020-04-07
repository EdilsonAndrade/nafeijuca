export const saveRequest = data => {
  return {
    type: '@product/SAVE_REQUEST',
    payload: data,
  };
};

export const saveSuccess = data => {
  return {
    type: '@product/SAVE_SUCCESS',
    payload: data,
  };
};

export const loadSuccess = data => {
  return {
    type: '@product/LOAD_SUCCESS',
    payload: data,
  };
};

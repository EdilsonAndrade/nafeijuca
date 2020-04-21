export const loadRequest = (data) => {
  return {
    type: '@product/LOAD_REQUEST',
    payload: data,
  };
};

export const loadSuccess = (data) => {
  return {
    type: '@product/LOAD_SUCCESS',
    payload: data,
  };
};

export const selectSuccess = (data) => {
  return {
    type: '@product/SELECT_SUCCESS',
    payload: data,
  };
};

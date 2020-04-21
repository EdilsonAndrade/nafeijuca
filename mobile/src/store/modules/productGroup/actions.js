export const loadSuccess = (data) => {
  return {
    type: '@productGroup/LOAD_SUCCESS',
    payload: data,
  };
};

export const loadRequest = (data) => {
  return {
    type: '@productGroup/LOAD_REQUEST',
    payload: data,
  };
};

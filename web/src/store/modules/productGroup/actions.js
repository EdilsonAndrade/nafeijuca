export const saveRequest = data => {
  return {
    type: '@productGroup/SAVE_REQUEST',
    payload: data,
  };
};
export const loadSuccess = data => {
  return {
    type: '@productGroup/LOAD_SUCCESS',
    payload: data,
  };
};

export const saveRequest = data => {
  return {
    type: '@productGroup/SAVE_REQUEST',
    payload: data,
  };
};

export const editSuccess = data => {
  return {
    type: '@productGroup/EDIT_SUCCESS',
    payload: data,
  };
};
export const loadSuccess = data => {
  return {
    type: '@productGroup/LOAD_SUCCESS',
    payload: data,
  };
};

export const loadRequest = data => {
  return {
    type: '@productGroup/LOAD_REQUEST',
    payload: data,
  };
};

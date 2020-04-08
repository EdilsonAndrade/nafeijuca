export const saveRequest = data => {
  return {
    type: '@product/SAVE_REQUEST',
    payload: data,
  };
};

export const editSuccess = data => {
  return {
    type: '@product/EDIT_SUCCESS',
    payload: data,
  };
};

export const loadRequest = storeId => {
  return {
    type: '@product/LOAD_REQUEST',
    payload: storeId,
  };
};
export const loadSuccess = data => {
  return {
    type: '@product/LOAD_SUCCESS',
    payload: data,
  };
};

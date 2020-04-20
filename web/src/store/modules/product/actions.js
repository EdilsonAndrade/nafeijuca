export const saveRequest = data => {
  return {
    type: '@product/SAVE_REQUEST',
    payload: data,
  };
};

export const editRequest = productId => {
  return {
    type: '@product/EDIT_REQUEST',
    payload: productId,
  };
};
export const editSuccess = data => {
  return {
    type: '@product/EDIT_SUCCESS',
    payload: data,
  };
};

export const deleteRequest = data => {
  return {
    type: '@product/DELETE_REQUEST',
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

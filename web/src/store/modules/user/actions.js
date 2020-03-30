export const saveRequest = data => {
  return {
    type: '@user/SAVE_REQUEST',
    payload: data,
  };
};

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
export const deleteRequest = id => {
  return {
    type: '@user/DELETE_REQUEST',
    payload: id,
  };
};

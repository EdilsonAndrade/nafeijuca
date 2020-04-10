export const saveRequest = data => {
  return {
    type: '@subitem/SAVE_REQUEST',
    payload: data,
  };
};

export const saveSuccess = data => {
  return {
    type: '@subitem/SAVE_SUCCESS',
    payload: data,
  };
};

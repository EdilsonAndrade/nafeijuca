export const saveRequest = data => {
  return {
    type: '@client/SAVE_REQUEST',
    payload: data,
  };
};

export const editSuccess = data => {
  return {
    type: '@client/EDIT_SUCCESS',
    payload: data,
  };
};
export const loadRequest = data => {
  return {
    type: '@client/LOAD_REQUEST',
    payload: data,
  };
};
export const loadSuccess = data => {
  return {
    type: '@client/LOAD_SUCCESS',
    payload: data,
  };
};

export const requestNewClient = () => {
  return {
    type: '@client/REQUEST_NEW_CLIENT',
  };
};

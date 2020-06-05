export const loadRequest = (data) => ({
  type: '@product/LOAD_REQUEST',
  payload: data,
});

export const loadSuccess = (data) => ({
  type: '@product/LOAD_SUCCESS',
  payload: data,
});

export const selectSuccess = (data) => ({
  type: '@product/SELECT_SUCCESS',
  payload: data,
});

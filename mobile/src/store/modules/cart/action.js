export const addToCartSuccess = (data) => ({
  type: '@cart/ADD_SUCCESS',
  payload: data,
});

export const removeFromCartSuccess = (data) => ({
  type: '@cart/REMOVE_SUCCESS',
  payload: data,
});

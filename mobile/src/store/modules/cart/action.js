export const addToCartSuccess = (data) => ({
  type: '@cart/ADD_SUCCESS',
  payload: data,
});

export const emptyCart = () => ({
  type: '@cart/EMPTY_SUCCESS',
});
export const addRequestFromOrder = (data) => ({
  type: '@cart/ADD_REQUEST_ORDER',
  payload: data,
});
export const addSuccessFromOrder = () => ({
  type: '@cart/ADD_SUCCESS_ORDER',

});

export const removeSuccessFromOrder = () => ({
  type: '@cart/REMOVE_SUCCESS_ORDER',

});

export const removeFromCartSuccess = (data) => ({
  type: '@cart/REMOVE_CART_SUCCESS',
  payload: data,
});

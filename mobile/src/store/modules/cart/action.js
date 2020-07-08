export const addToCartSuccess = (data) => ({
  type: '@cart/ADD_TO_CART_SUCCESS',
  payload: data,
});

export const emptyCart = () => ({
  type: '@cart/EMPTY_SUCCESS',
});


export const removeSuccessFromOrder = () => ({
  type: '@cart/REMOVE_SUCCESS_ORDER',

});

export const removeFromCartSuccess = (data) => ({
  type: '@cart/REMOVE_CART_SUCCESS',
  payload: data,
});

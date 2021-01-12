export const setLocationSuccess = (data) => ({
  type: '@user/SET_LOCATION_SUCCESS',
  payload: data,
});

export const setDefaultAddress = (data) => ({
  type: '@user/SET_DEFAULT_ADDRESS',
  payload: data,
});

export const setUser = (data) =>({
  type:'@user/SET_USER',
  payload:data
})
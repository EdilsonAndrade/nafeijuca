export const requestSignin = data => {
  return {
    type: '@auth/REQUEST_SIGNIN',
    payload: data,
  };
};

export const signinSuccess = data => {
  return {
    type: '@user/SIGNIN_SUCCESS',
    payload: data,
  };
};

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
export const signoutRequesst = () => {
  return {
    type: '@user/SIGNOUT_REQUEST',
  };
};
export const signout = () => {
  return {
    type: '@user/SIGNOUT_SUCCESS',
  };
};

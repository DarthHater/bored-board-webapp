import { push } from 'connected-react-router';
import userConstants from '../constants/user-types';
import authService from '../services/AuthService';

function logoutSuccess() {
  return { type: userConstants.LOGOUT };
}

function loginSuccess(user) {
  return { type: userConstants.LOGIN_SUCCESS, user };
}

function loginFailure(response) {
  return { type: userConstants.LOGIN_FAILURE, response };
}

function registerSuccess(user) {
  return { type: userConstants.REGISTER_SUCCESS, user };
}

function logout() {
  return dispatch => {
    authService.logout();
    dispatch(logoutSuccess());
  };
}

function login(data) {
  return dispatch => {
    return authService
      .login(data)
      .then(user => {
        if (!user || !user.response) {
          return dispatch(loginFailure());
        }

        if (user.response.status === 200) {
          return dispatch(loginSuccess(user));
        }

        return dispatch(loginFailure(user.response));
      })
      .catch(error => {
        throw error;
      });
  };
}

function register(data) {
  return dispatch => {
    return authService
      .register(data)
      .then(user => {
        dispatch(registerSuccess(user));
        dispatch(push('/'));
      })
      .catch(error => {
        throw error;
      });
  };
}

export default {
  login,
  logout,
  register,
};

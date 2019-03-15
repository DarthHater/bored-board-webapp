import config from 'react-global-configuration';
import axios from 'axios';
import * as auth from '../auth/authentication';

function register(data) {
  const baseUrl = config.get('API_ROOT');

  return axios
    .post(`${baseUrl}/register`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        return response.data;
      }
      return response.data;
    })
    .catch(error => error);
}

function logout() {
  auth.logOut();
}

function login(data) {
  const baseUrl = config.get('API_ROOT');

  return axios
    .post(`${baseUrl}/login`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
          // eslint-disable-next-line no-restricted-globals
          location.reload(true);
        } else if (response.data.token) {
          sessionStorage.setItem('jwt', response.data.token);
        }
      }
    })
    .catch(error => error);
}

export default {
  login,
  logout,
  register,
};

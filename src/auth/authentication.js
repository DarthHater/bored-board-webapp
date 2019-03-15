/* eslint-disable camelcase */
import jwt_decode from 'jwt-decode';

export function isLoggedIn() {
  if (!sessionStorage.getItem('jwt')) {
    return false;
  }
  return true;
}

export function getUserId() {
  const decoded = jwt_decode(sessionStorage.getItem('jwt'));

  return decoded.id;
}

export function getUserRole() {
  const decoded = jwt_decode(sessionStorage.getItem('jwt'));
  return decoded.role;
}

export function checkUser(userId) {
  if (userId === getUserId()) {
    return true;
  }
  return false;
}

export function userHasPermission(permission) {
  return permission.includes(getUserRole());
}

export function getUsername() {
  const decoded = jwt_decode(sessionStorage.getItem('jwt'));

  return decoded.user;
}

export function getRequestHeaders() {
  return {
    AUTHORIZATION: `Bearer ${sessionStorage.jwt}`,
    'Content-Type': 'application/json',
  };
}

export function logOut() {
  sessionStorage.removeItem('jwt');
}

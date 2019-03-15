import config from 'react-global-configuration';
import axios from 'axios';
import { getRequestHeaders } from '../auth/authentication';

class UserService {
  getUserInfo = userId => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .get(`${baseUrl}/user/${userId}`, {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };

  getUsers = searchTerm => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .get(`${baseUrl}/users?search=${searchTerm}`, {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };
}

export default new UserService();

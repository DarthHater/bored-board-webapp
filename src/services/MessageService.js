import config from 'react-global-configuration';
import axios from 'axios';
import { getRequestHeaders } from '../auth/authentication';

class MessageService {
  getAllMessages = userId => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .get(`${baseUrl}/messages/${userId}`, {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };

  getMessage = messageId => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .get(`${baseUrl}/message/${messageId}`, {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };

  postMessage = data => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .post(`${baseUrl}/newmessage`, JSON.stringify(data), {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };

  getMessagePosts = messageId => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .get(`${baseUrl}/messageposts/${messageId}`, {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };

  postMessagePost = (messageId, userId, body) => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .post(
        `${baseUrl}/message`,
        JSON.stringify({
          MessageId: messageId,
          UserId: userId,
          Body: body,
        }),
        {
          headers,
        }
      )
      .then(response => response.data)
      .catch(error => error);
  };
}

export default new MessageService();

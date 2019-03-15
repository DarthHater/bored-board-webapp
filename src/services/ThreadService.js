import config from 'react-global-configuration';
import axios from 'axios';
import { getRequestHeaders } from '../auth/authentication';

class ThreadService {
  getAllThreads = since => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .get(`${baseUrl}/threads/${since}`, {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };

  getThread = threadId => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .get(`${baseUrl}/thread/${threadId}`, {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };

  postThread = data => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .post(`${baseUrl}/thread`, JSON.stringify(data), {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };

  getPosts = threadId => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .get(`${baseUrl}/posts/${threadId}`, {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };

  postPost = (threadId, userId, body) => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .post(
        `${baseUrl}/post`,
        JSON.stringify({
          ThreadId: threadId,
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

  editPost = (text, postId) => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .patch(
        `${baseUrl}/posts/${postId}`,
        JSON.stringify({
          Body: text,
        }),
        {
          headers,
        }
      )
      .then(response => response.data)
      .catch(error => error);
  };

  deleteThread = threadId => {
    const baseUrl = config.get('API_ROOT');
    const headers = getRequestHeaders();

    return axios
      .delete(`${baseUrl}/thread/${threadId}`, {
        headers,
      })
      .then(response => response.data)
      .catch(error => error);
  };
}

export default new ThreadService();

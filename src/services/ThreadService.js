import config from 'react-global-configuration';
import axios from 'axios';

class ThreadService {

    requestHeaders() {
        return { 'AUTHORIZATION': `Bearer ${sessionStorage.jwt}` }
    }

    getAllThreads() {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();

        return axios.get(`${baseUrl}/threads`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    getThread(threadId) {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();

        return axios.get(`${baseUrl}/thread/${threadId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    postThread(data) {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();

        return axios.post(`${baseUrl}/thread`, JSON.stringify(data), {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    getPosts(threadId) {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();

        return axios.get(`${baseUrl}/posts/${threadId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    postPost(threadId, userId, body) {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();

        return axios.post(`${baseUrl}/post`, JSON.stringify({
            ThreadId: threadId,
            UserId: userId,
            Body: body,
        }), {
                headers: headers
            }).then(response => {
                return response.data;
            }).catch(error => {
                return error;
            });
    }

    deleteThread(threadId) {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();

        return axios.delete(`${baseUrl}/thread/${threadId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }
}

export default new ThreadService();

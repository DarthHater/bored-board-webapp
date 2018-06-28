import config from 'react-global-configuration';

class ThreadService {

    requestHeaders() {
        return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    }

    getAllThreads() {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();
        const request = new Request(`${baseUrl}/threads`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            });
    }

    getThread(threadId) {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();
        const request = new Request(`${baseUrl}/thread/${threadId}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            });
    }

    getPosts(threadId) {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();
        const request = new Request(`${baseUrl}/posts/${threadId}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            });
    }

    postPost(threadId, userId, body) {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();
        const request = new Request(`${baseUrl}/post`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
            },
            body: JSON.stringify({
                ThreadId: threadId,
                UserId: userId,
                Body: body,
            })
        });

        return fetch(request)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            });
    }
}

export default new ThreadService();

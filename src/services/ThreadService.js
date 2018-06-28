import config from 'react-global-configuration';

class ThreadService {
    // Should likely do this in a global config class
    getBaseUrl() {
        return config.get('API_ROOT');
    }

    requestHeaders() {
        return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    }

    getAllThreads() {
        const headers = this.requestHeaders();
        const request = new Request(`${getBaseUrl()}/threads`, {
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
        const headers = this.requestHeaders();
        const request = new Request(`${getBaseUrl()}/thread/${threadId}`, {
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
        const headers = this.requestHeaders();
        const request = new Request(`${getBaseUrl()}/posts/${threadId}`, {
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
        const headers = this.requestHeaders();
        const request = new Request(`${getBaseUrl()}/post`, {
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

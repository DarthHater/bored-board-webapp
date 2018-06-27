class ThreadService {
    requestHeaders() {
        return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    }

    getAllThreads() {
        const headers = this.requestHeaders();
        const request = new Request(`http://localhost:8000/threads`, {
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
        const request = new Request(`http://localhost:8000/thread/${threadId}`, {
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
        const request = new Request(`http://localhost:8000/posts/${threadId}`, {
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
        const request = new Request('http://localhost:8000/post', {
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

class AuthService {
    login(data) {
        return fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
            })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            });
    }
}

export default new AuthService();
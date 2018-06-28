import config from 'react-global-configuration';

class AuthService {
    login(data) {
        let baseUrl = config.get('API_ROOT');
        return fetch(`${baseUrl}/login`, {
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

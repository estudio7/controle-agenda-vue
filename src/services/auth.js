import api from './api';

export default {
    async login(username, password) {
        try {
            const response = await api.post('auth/login', {
                username,
                password
            });

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.accessToken);
            }

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    logout() {
        localStorage.removeItem('token');
    },
    async register(user) {
        try {
            const response = await api.post('/register', user);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

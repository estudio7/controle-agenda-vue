import axios from 'axios';

const api = axios.create({
    baseURL: 'https://demometaway.vps-kinghost.net:8485/api/'
});


api.interceptors.request.use(config => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5MTUwMjEyNiwiZXhwIjoxNjkxNTg4NTI2fQ.Gw0oYcUGpqXw-iqIdGgt1zgsTeBWEEfq6QujrNmKwfEPTkVjO9kiv4I0hUIVptVJAzIGGewOJLtzZ-W6kdOP0Q';
    // Adicionado token manualmente para fins de estilizaçao e ajustes de interface, lembrar de recuperar via localstore
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;

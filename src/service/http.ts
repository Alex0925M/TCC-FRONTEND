import axios from 'axios';

export const http = axios.create({
    baseURL: "http://localhost:8080/",
    // withCredentials: true, // Ative se o backend usa cookies
    headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
    },
});

http.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('authToken'); // Recupera o token do localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // Adicione aqui a lógica para lidar com erros globais, como redirecionar para login se o token estiver expirado
        return Promise.reject(error);
    }
);

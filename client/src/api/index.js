import axios from "axios";

const base_url = 'http://localhost:4000/';

const $host = axios.create({
    baseURL: base_url
})

const $authHost = axios.create({
    baseURL: base_url
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (userData) => {
    try {
        const response = await $host.post('api/user/registration', userData);
        localStorage.setItem('token', response.data.token);
        return jwt_decode(response.data.token);
    } catch (error) {
        throw error.response.data;
    }
}

export const login = async (userData) => {
    try {
        const response = await $host.post('api/user/login', userData);
        localStorage.setItem('token', response.data.token);
        return jwt_decode(response.data.token);
    } catch (error) {
        throw error.response.data;
    }
}

export const check = async () => {
    const response = await $authHost.get('api/user/auth')
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token)
}
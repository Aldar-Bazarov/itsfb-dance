import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (userData) => {
    try {
        const response = await $host.post('api/user/registration', userData);
        return response
    } catch (error) {
        throw error.response.data;
    }
}

export const login = async (userData) => {
    try {
        const {data} = await $host.post('api/user/login', userData);
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    } catch (error) {
        throw error.response.data;
    }
}

export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    } catch (error) {
        throw error.response.data;
    }
}

export const getInfo = async (email) => {
    try {
        const {data} = await $authHost.get(`api/user/info?email=${email}`);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const update = async(id, userData) => {
    try {
        await $authHost.put('api/user/update/'+ id, userData);
    } catch (error) {
        throw error.response.data;
    }
}

export const updateImage = async(id, img) => {
    try {
        await $authHost.put('api/user/updateImage/'+ id, img);
    } catch (error) {
        throw error.response.data;
    }
}

export const getUsersByRole = async(role) => {
    try {
        const {data} = await $authHost.get(`api/user/getUsersByRole?role=${role}`);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}
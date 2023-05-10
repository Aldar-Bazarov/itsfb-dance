import { $authHost } from "./index";

export const getSecretKey = async (role) => {
    try {
        const { data } = await $authHost.get('api/registrationsecretkey?role=' + role)
        return data.key
    } catch (error) {
        throw error.response.data;
    }
}

export const updateSecretKey = async (role) => {
    try {
        const { data } = await $authHost.put('api/registrationsecretkey?role=' + role)
        return data.key
    } catch (error) {
        throw error.response.data;
    }
}
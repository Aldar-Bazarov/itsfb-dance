import { $authHost, $host } from "./index";

export const getSchool = async (limit = 5, page = 1) => {
    try {
        const { data } = await $host.get('api/school')
        return data
    } catch (error) {
        throw error.response.data;
    }
}

export const updateSchool = async (schoolData) => {
    try {
        const { data } = await $authHost.put('api/school', schoolData)
        return data
    } catch (error) {
        throw error.response.data;
    }
}
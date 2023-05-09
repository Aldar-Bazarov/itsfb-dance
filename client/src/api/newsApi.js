import { $authHost, $host } from "./index";

export const createNews = async (newsData) => {
    try {
        await $authHost.post('api/news', newsData);
    } catch (error) {
        throw error.response.data;
    }
}

export const getAllNews = async (limit = 5, page = 1) => {
    try {
        const { data } = await $host.get('api/news', {
            params: {
                limit,
                page
            }
        })
        return { news: data.rows, totalCount: data.count}
    } catch (error) {
        throw error.response.data;
    }
}

export const getOneNews = async (id) => {
    try {
        return await $host.get('api/news/' + id)
    } catch (error) {
        throw error.response.data;
    }
}

export const deleteNews = async (id) => {
    try {
        return await $authHost.delete('api/news/' + id)
    } catch (error) {
        throw error.response.data;
    }
}
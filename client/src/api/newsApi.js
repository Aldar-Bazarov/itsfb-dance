import { $authHost, $host } from "./index";

export const createNews = async (newsData) => {
    try {
        await $authHost.post('api/news', newsData);
    } catch (error) {
        throw error.response.data;
    }
}
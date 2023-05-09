import { $authHost, $host } from "./index";

export const createEvent = async (eventData) => {
    try {
        await $authHost.post('api/event', eventData);
    } catch (error) {
        throw error.response.data;
    }
}

export const getAllEvents = async (limit = 5, page = 1) => {
    try {
        const { data } = await $host.get('api/event', {
            params: {
                limit,
                page
            }
        })
        return { events: data.rows, totalCount: data.count}
    } catch (error) {
        throw error.response.data;
    }
}

export const getClosestEvent = async () => {
    try {
        const { data } = await $host.get('api/event/closest')
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const deleteEvent = async (id) => {
    try {
        return await $authHost.delete('api/event/' + id)
    } catch (error) {
        throw error.response.data;
    }
}
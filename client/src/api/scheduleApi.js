import { $authHost } from "./index";

export const createSchedule = async (scheduleDate) => {
    try {
        const { data } = await $authHost.post('api/schedule', scheduleDate);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getSchedule = async (groupId) => {
    try {
        const { data } = await $authHost.get('api/schedule?groupId=' + groupId);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getOldSchedule = async (groupId, limit = 5, page = 1) => {
    try {
        const { data } = await $authHost.get('api/schedule/old', {
            params: {
                groupId,
                limit,
                page
            }
        });
        return data;
    } catch (error) {
        throw error.response.data;
    }
}
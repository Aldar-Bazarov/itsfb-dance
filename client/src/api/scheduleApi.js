import { $authHost } from "./index";

export const createSchedule = async (scheduleDate) => {
    try {
        const { data } = await $authHost.post('api/schedule', scheduleDate);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}
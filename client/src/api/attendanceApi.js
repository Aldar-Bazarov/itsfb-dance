import { $authHost, $host } from "./index";

export const createAttendance = async (attendanceData) => {
    try {
        await $authHost.post('api/attendance', attendanceData);
    } catch (error) {
        throw error.response.data;
    }
}

export const getAttendances = async (scheduleId) => {
    try {
        const { data } = await $authHost.get('api/attendance', {
            params: {
                scheduleId,
            }
        })
        return data;
    } catch (error) {
        throw error.response.data;
    }
}
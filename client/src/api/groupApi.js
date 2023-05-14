import { $authHost } from "./index";

export const createGroup = async (groupData) => {
    try {
        const { data } = await $authHost.post('api/group', groupData);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const addStudent = async (groupData) => {
    try {
        const { data } = await $authHost.post('api/group/addStudent', groupData);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getGroup = async (groupId) => {
    try {
        const { data } = await $authHost.get('api/group?groupId=' + groupId);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getAllGroups = async (groupId) => {
    try {
        const { data } = await $authHost.get('api/group/getAll');
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const deleteGroup = async (groupId) => {
    try {
        const { data } = await $authHost.delete('api/group/' + groupId);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}
import { $authHost, $host } from "./index";

export const createComment = async (commentData) => {
    try {
        await $authHost.post('api/comment', commentData);
    } catch (error) {
        throw error.response.data;
    }
}

export const getCommentsByNewsId = async (newsId) => {
    try {
        const { data } = await $host.get('api/comment', {
            params: {
                newsId,
            }
        })
        return { comments: data.rows, totalCount: data.count}
    } catch (error) {
        throw error.response.data;
    }
}
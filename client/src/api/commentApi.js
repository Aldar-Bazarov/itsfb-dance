import { $authHost, $host } from "./index";

export const createComment = async (commentData) => {
    try {
        await $authHost.post('api/comment', commentData);
    } catch (error) {
        throw error.response.data;
    }
}

export const getCommentsByNewsId = async (newsId, limit = 10, page = 1) => {
    try {
        const { data } = await $host.get('api/comment', {
            params: {
                newsId,
                limit,
                page,
            }
        })
        return { comments: data.rows, totalCount: data.count}
    } catch (error) {
        throw error.response.data;
    }
}
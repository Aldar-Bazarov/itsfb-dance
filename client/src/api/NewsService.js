import axios from "axios";

export default class NewsService {
    static async getAll(limit = 5, page = 1) {
        const response = await axios.get('http://localhost:4000/api/news', {
            params: {
                limit,
                page
            }
        })
        return response;
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:4000/api/news/' + id)
        return response;
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(`http://localhost:4000/api/news/${id}/comments`)
        return response;
    }
}
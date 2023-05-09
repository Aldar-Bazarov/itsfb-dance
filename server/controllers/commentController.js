const { Comment } = require('../models/models');
const ApiError = require('../error/ApiError');


class CommentCotroller {
    async get(req, res, next) {
        let { newsId, page, limit } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        try {
            const comments = await Comment.findAndCountAll({
                limit,
                offset,
                where: {
                    newsId: newsId,
                },
            });

            res.status(200).json(comments);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    };

    async create(req, res) {
        try {
            const { newsId, text, userId } = req.body;

            const comment = await Comment.create({
                text,
                newsId,
                userId
            });

            res.status(201).json(comment);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new CommentCotroller();
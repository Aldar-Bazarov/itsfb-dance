const { Comment } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class CommentCotroller {
    async get(req, res, next) {
        try {
            const { newsId } = req.query;
            const comments = await Comment.findAndCountAll({
                where: {
                    newsId: newsId,
                },
                order: [['createdAt', 'DESC']],
            });

            res.status(200).json(comments);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    };

    async create(req, res) {
        try {
            const { newsId, userId, text, firstname, secondname, userImg } = req.body;

            const comment = await Comment.create({
                newsId,
                userId,
                text,
                firstname,
                secondname,
                userImg
            });


            res.status(201).json(comment);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }
}

module.exports = new CommentCotroller();
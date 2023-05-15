const { News } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class NewsController {
    async create(req, res, next) {
        try {
            const { title, content, schoolId } = req.body;
            
            if (!req.files) {
                return next(ApiError.badRequest('Изображение не загружено!'))
            }
            const { img } = req.files;
            const fileName = uuid.v4() + ".jpg";
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const news = await News.create({ title, content, schoolId, img: fileName });

            return res.status(201).json({ news });
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    };

    async getAll(req, res) {
        try {
            let {page, limit} = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            const allNews = await News.findAndCountAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json(allNews);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const news = await News.findOne({ where: {id}});
            if (news) {
                res.status(200).json(news);
            } else {
                res.status(404).json({message: 'Новость не найдена'})
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            const oneNews = await News.findByPk(id);
            if (!oneNews) {
              return res.status(404).json({ error: 'Новость не найдена' });
            }
            await oneNews.destroy();
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Не удалось удалить новость из базы данных' });
        }
    }
}

module.exports = new NewsController();
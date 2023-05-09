const { Event } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const sequelize = require('../db')
const { Op } = require('sequelize');

class EventController {
    async create(req, res, next) {
        try {
            const { title, description, date, time, place } = req.body;

            if (!req.files) {
                return next(ApiError.badRequest('Изображение не загружено!'))
            }
            const { img } = req.files;
            const fileName = uuid.v4() + ".jpg";
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const event = await Event.create({ title, description, date, time, place, img: fileName });

            return res.status(201).json({ event });
        } catch (err) {
            console.log(err);
            return next(ApiError.internal("Не удалось создать мероприятие в базе данных"));
        }
    };

    async getClosestEvent(req, res, next) {
        try {
            let { page, limit } = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            
            const allEvents = await Event.findOne({
                limit,
                offset,
                where: {
                  date: { [Op.gte]: new Date() }
                },
                order: [['date', 'ASC']],
            });

            res.status(200).json(allEvents);
        } catch (err) {
            console.error(err);
            return next(ApiError.internal("Ошибка: Не удалось получить мероприятия из базы данных!"))
        }
    };

    async getAll(req, res, next) {
        try {
            let { page, limit } = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            
            const allEvents = await Event.findAndCountAll({
                limit,
                offset,
                where: {
                  date: { [Op.gte]: new Date() }
                },
                order: [['date', 'ASC']],
            });

            res.status(200).json(allEvents);
        } catch (err) {
            console.error(err);
            return next(ApiError.internal("Ошибка: Не удалось получить мероприятия из базы данных!"))
        }
    }

    async getAllOld(req, res, next) {
        try {
            let { page, limit } = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            
            const allEvents = await Event.findAndCountAll({
                limit,
                offset,
                where: {
                    date: {
                      [Op.lt]: new Date(),
                    }
                },
                order: [['date', 'ASC']],
            });

            res.status(200).json(allEvents);
        } catch (err) {
            console.error(err);
            return next(ApiError.internal("Ошибка: Не удалось получить мероприятия из базы данных!"))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const event = await Event.findByPk(id);
            if (!event) {
                return next(ApiError.badRequest(`Ошибка: Мероприятие с id:${id} не найдена!`))
            }
            await event.destroy();
            return res.status(200).json({ message: 'Мероприятие успешно удалено' });
        } catch (err) {
            console.error(err);
            return next(ApiError.internal("Ошибка: Не удалось удалить мероприятие из базы данных!"))
        }
    }
}

module.exports = new EventController();
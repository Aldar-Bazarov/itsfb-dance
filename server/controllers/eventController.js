const { Event } = require('../models/models');
const ApiError = require('../error/ApiError')

class EventController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const school = await Event.create({ name });
            return res.status(200).json({ school });
        } catch (err) {
            console.error(err);
            return next(ApiError.internal("Ошибка: Не удалось создать школу в базе данных!"))
        }
    };

    async getAll(req, res, next) {
        try {
            const schools = await Event.findAll();
            res.status(200).json(schools);
        } catch (err) {
            console.error(err);
            return next(ApiError.internal("Ошибка: Не удалось получить школы из базы данных!"))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const school = await Event.findOne({ where: { id } });
            if (school) {
                res.status(200).json(school);
            } else {
                return next(ApiError.badRequest(`Ошибка: Школа с id:${id} не найдена!`))
            }
        } catch (err) {
            console.error(err);
            return next(ApiError.internal("Ошибка: Не удалось получить школы из базы данных!"))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const school = await Event.findByPk(id);
            if (!school) {
                return next(ApiError.badRequest(`Ошибка: Школа с id:${id} не найдена!`))
            }
            await school.destroy();
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return next(ApiError.internal("Ошибка: Не удалось удалить школу из базы данных!"))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const school = await Event.findByPk(id);

            if (!school) {
                return next(ApiError.badRequest(`Школа с id:${id} не найдена`));
            }

            // Обновляем данные
            await school.update({
                name: name,
            });

            // Сохраняем изменения в базе данных
            await school.save();

            return res.status(200).json(school);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new EventController();
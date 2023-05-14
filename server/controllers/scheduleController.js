const ApiError = require('../error/ApiError');
const { Schedule } = require('../models/models');

class ScheduleController {
    async create(req, res, next) {
        try {
            const { days, groupId } = req.body;
            for (let i = 0; i < days.length; i++) {
                const isSchedule = await Schedule.findOne({where: {day: days[i].date, groupId}});
                if(isSchedule) {
                    return next(ApiError.internal(`Расписание на день ${isSchedule.day} уже есть!`));
                }
                await Schedule.create({ day: days[i].date, groupId });
            }
            return res.status(201).json({ message: "Расписание успешно создано!" });
        } catch (err) {
            console.log(err);
            return next(ApiError.internal("Непредвиденная ошибка!"));
        }
    }

    async get(req, res, next) {
        try {
            const { groupId } = req.query;
            if (!groupId) {
                return next(ApiError.internal("Пользователь не добавлен в группу!"));
            }
            const schedules = await Schedule.findAndCountAll({where: {groupId}});
            if (!schedules) {
                return next(ApiError.internal("Расписание ешё не создано!"));
            }
            return res.status(201).json(schedules);
        } catch (err) {
            console.log(err);
            return next(ApiError.internal("Непредвиденная ошибка!"));
        }
    }
};

module.exports = new ScheduleController()
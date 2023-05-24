const { Attendance } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class AttendanceController {
    async get(req, res, next) {
        try {
            const { scheduleId } = req.query;
            const attendances = await Attendance.findAll({
                where: {
                    scheduleId
                },
            });

            res.status(200).json(attendances);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    };

    async create(req, res) {
        try {
            const { scheduleId, usersId, presences } = req.body;

            for (let i = 0; i < usersId.length; i++) {
                const attendance = await Attendance.findOne({where: {userId: usersId[i], scheduleId }})
                if (attendance) {
                    attendance.update({
                        scheduleId,
                        userId: usersId[i],
                        presence: presences[i]
                    });
                    await attendance.save();
                } else {
                    await Attendance.create(({
                        scheduleId,
                        userId: usersId[i],
                        presence: presences[i]
                    }))
                }
            }

            res.status(201).json("Посещяемость успешно создана");
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }
}

module.exports = new AttendanceController();
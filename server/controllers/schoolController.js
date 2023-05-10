const { School } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class SchoolController {
    async create(req, res, next) {
        try {
            const schoolData = req.body;
            
            if (!req.files) {
                return next(ApiError.badRequest('Изображение не загружено!'))
            }
            const { photo } = req.files;
            const fileName = uuid.v4() + ".jpg";
            await photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            const school = await School.create({
                name: schoolData.name,
                description: schoolData.description,
                address: schoolData.address,
                teacherCount: schoolData.teacherCount,
                groupCount: schoolData.groupCount,
                studentCount: schoolData.studentCount,
                phoneNumber: schoolData.phoneNumber,
                email: schoolData.email,
                map: schoolData.map,
                photo: fileName
            });

            return res.status(201).json(school);
        } catch (err) {
            console.error(err);
            return next(ApiError.internal("Ошибка: Не удалось создать школу в базе данных!"))
        }
    };

    async get(req, res, next) {
        try {
            const school = await School.findOne();
            res.status(200).json(school);
        } catch (err) {
            console.error(err);
            return next(ApiError.internal("Ошибка: Не удалось получить школы из базы данных!"))
        }
    }

    async update(req, res, next) {
        try {
            const schoolData = req.body;
            
            if (!req.files) {
                return next(ApiError.badRequest('Изображение не загружено!'))
            }
            const { photo } = req.files;
            const fileName = uuid.v4() + ".jpg";
            await photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            const school = await School.findOne();
            if (!school) {
                return next(ApiError.badRequest(`Школа не найдена`));
            }

            await school.update({
                name: schoolData.name,
                description: schoolData.description,
                address: schoolData.address,
                teacherCount: schoolData.teacherCount,
                groupCount: schoolData.groupCount,
                studentCount: schoolData.studentCount,
                phoneNumber: schoolData.phoneNumber,
                email: schoolData.email,
                map: schoolData.map,
                photo: fileName
            });

            await school.save();

            return res.status(200).json(school);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SchoolController();
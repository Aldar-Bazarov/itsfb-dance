const { RegistrationSecretKey } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');

class RegistrationSecretKeyController {
    async create(req, res, next) {
        try {
            const { role } = req.body;
            const key = uuid.v4();
            const registrationSecretKey = await RegistrationSecretKey.create({
                role,
                key
            });
            return res.status(201).json(registrationSecretKey);
        } catch (err) {
            console.log(err);
            return next(ApiError.internal("Не удалось создать секретный ключ для регистрации"));
        }
    };

    async get(req, res) {
        try {
            const { role } = req.query;
            const registrationSecretKey = await RegistrationSecretKey.findOne({ where: { role } });
            res.status(200).json(registrationSecretKey);
        } catch (err) {
            console.error(err);
            return next(ApiError.internal({message: "Не удалось получить секретный ключ для регистрации"}));
        }
    }

    async update(req, res) {
        try {
            const { role } = req.query;
            const key = uuid.v4();
            const registrationSecretKey = await RegistrationSecretKey.findOne({ where: { role } });
            await registrationSecretKey.update({ key });
            await registrationSecretKey.save();
            return res.status(201).json(registrationSecretKey);
        } catch (err) {
            console.error(err);
            return next(ApiError.internal({message: "Не удалось создать секретный ключ для регистрации"}));
        }
    }
}

module.exports = new RegistrationSecretKeyController();
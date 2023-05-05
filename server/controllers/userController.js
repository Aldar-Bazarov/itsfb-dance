const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
}

class UserController {
  async registration(req, res, next) {
    try {
      // извлекаем из тела запроса данные пользователя
      const { firstname, secondname, email, password, role } = req.body;
      if (!firstname || !secondname || !email || !password) {
        return next(ApiError.badRequest('Не все данные введены!'));
      }
      // проверяем, что пользователь с таким email не существует
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует!'));
      }

      // хешируем пароль пользователя
      const hashedPassword = await bcrypt.hash(password, 7);

      // создаем нового пользователя в базе данных
      const newUser = await User.create({ firstname, secondname, email, password: hashedPassword, role });

      const token = generateJwt(newUser.id, email, newUser.role);

      // возвращаем ответ с успешной регистрацией и данными нового пользователя
      return res.status(201).json({message: 'Регистрация прошла успешно', token});
    } catch (err) {
      console.error(err);
      return next(ApiError.internal('Что-то пошло не так, попробуйте еще раз'));
    }
  };

  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      // Поиск пользователя в БД по email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.internal("Пользователь с таким email не найден!"));
      }

      // Сверяем введенный пароль с хэшем пароля в БД
      const match = await bcrypt.compareSync(password, user.password);
      if (!match) {
        return next(ApiError.internal("Указан неверный пароль!"))
      }

      // Создание токена с payload'ом, содержащим ID пользователя
      const token = generateJwt(user.id, user.email, user.role);

      // Отправка успешного ответа
      return res.status(200).json({token});
    } catch (err) {
      console.log(err);
      return next(ApiError.internal("Непредвиденная ошибка!"));
    }
  };

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.status(200).json({token});
  };
};

module.exports = new UserController()
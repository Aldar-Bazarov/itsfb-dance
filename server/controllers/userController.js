const ApiError = require('../error/ApiError');
const { User, RegistrationSecretKey } = require('../models/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateJwt = (id, email, role, firstname, secondname) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: 60 * 60 * 24 }
  );
}

class UserController {
  async registration(req, res, next) {
    try {
      const { firstname, secondname, email, password, secretKey } = req.body;
      if (!firstname || !secondname || !email || !password) {
        return next(ApiError.badRequest('Не все данные введены!'));
      }

      const existingSecretKey = await RegistrationSecretKey.findOne({
        where: { key: secretKey }
      });

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует!'));
      }

      if (!existingSecretKey) {
        return next(ApiError.badRequest('Секретный ключ не подходит!'));
      }

      console.log(existingSecretKey.role);

      const hashedPassword = await bcrypt.hash(password, 7);
      const newUser = await User.create({
        firstname,
        secondname,
        email,
        password: hashedPassword,
        role: existingSecretKey.role
      });

      const token = generateJwt(newUser.id, email, newUser.role, newUser.firstname, newUser.secondname);
      return res.status(201).json({ message: 'Регистрация прошла успешно', token });
    } catch (err) {
      console.error(err);
      return next(ApiError.internal('Не удалось зарегестрировать пользователя в системе'));
    }
  };

  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.internal("Пользователь с таким email не найден!"));
      }

      const match = bcrypt.compareSync(password, user.password);
      if (!match) {
        return next(ApiError.internal("Указан неверный пароль!"))
      }

      const token = generateJwt(user.id, user.email, user.role, user.firstname, user.secondname);
      return res.status(200).json({ message: 'Успешный вход в аккаунт!', token });
    } catch (err) {
      console.log(err);
      return next(ApiError.internal("Непредвиденная ошибка!"));
    }
  };

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.status(200).json({ token });
  };

  async getUserInfo(req, res, next) {
    try {
      const { email } = req.query;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.internal("Пользователь с таким email не найден!"));
      }

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return next(ApiError.internal("Непредвиденная ошибка!"));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { property, value } = req.body;
      const user = await User.findOne({ where: { id } });

      user[property] = value;

      await user.save();
      res.status(200).json({ message: 'Свойство пользователя успешно обновлено' });
    } catch (error) {
      console.log(err);
      return next(ApiError.internal("Непредвиденная ошибка!"));
    }
  }
};

module.exports = new UserController()
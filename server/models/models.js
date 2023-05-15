const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const News = sequelize.define('news', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    dislikes: { type: DataTypes.INTEGER, defaultValue: 0 }
});

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    firstname: { type: DataTypes.STRING, allowNull: false },
    secondname: { type: DataTypes.STRING, allowNull: false },
    userImg: { type: DataTypes.STRING, allowNull: false },
});

const Event = sequelize.define('event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    place: { type: DataTypes.STRING, allowNull: false }
});

const School = sequelize.define('school', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false },
    teacherCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    groupCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    studentCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    map: { type: DataTypes.STRING, allowNull: false },
});

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: { type: DataTypes.STRING, allowNull: false },
    secondname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    trains: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    awards: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    experience: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    motto: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Мой девиз!' },
    target: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Моя цель!' },
    role: { type: DataTypes.STRING, defaultValue: "STUDENT" },
    img: { type: DataTypes.STRING, allowNull: true, defaultValue: "profile.svg" },
});

const Group = sequelize.define('group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Schedule = sequelize.define('schedule', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    day: { type: DataTypes.DATEONLY, allowNull: false }
})

const RegistrationSecretKey = sequelize.define('registrationSecretKey', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, allowNull: false },
    key: { type: DataTypes.STRING, allowNull: false },
})

Group.hasMany(User);
Group.hasMany(Schedule);
User.belongsTo(Group);
Schedule.belongsTo(Group);

Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(News);
News.hasMany(Comment);

module.exports = {
    News,
    Comment,
    School,
    User,
    Event,
    Group,
    Schedule,
    RegistrationSecretKey
}
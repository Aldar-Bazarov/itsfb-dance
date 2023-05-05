const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const News = sequelize.define('news', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    likes: {type: DataTypes.INTEGER, defaultValue: 0},
    dislikes: {type: DataTypes.INTEGER, defaultValue: 0}
});

const Event = sequelize.define('event', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    place: {type: DataTypes.STRING, allowNull: false}
});

const School = sequelize.define('school', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type: DataTypes.STRING, allowNull: false},
    secondname: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    trains: {type: DataTypes.INTEGER, defaultValue: 0},
    awards: {type: DataTypes.INTEGER, defaultValue: 0},
    experience: {type: DataTypes.INTEGER, defaultValue: 0},
    motto: {type: DataTypes.STRING, defaultValue: ''},
    target: {type: DataTypes.STRING, defaultValue: ''}
});

const Group = sequelize.define('group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Schedule = sequelize.define('schedule', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dayOfWeek: {type: DataTypes.STRING, allowNull: false},
    time: {type: DataTypes.TIME, allowNull: false}
})

School.hasMany(News);
News.belongsTo(School);

School.hasMany(Event);
Event.belongsTo(School);

School.hasMany(Group, {foreignKey: {allowNull: false}});
Group.belongsTo(School);

Group.hasMany(User);
User.belongsTo(Group);
Schedule.belongsTo(Group);

User.hasMany(Schedule);
Schedule.belongsTo(User);

module.exports = {
    News, 
    School,
    User,
    Event,
    Group,
    Schedule
}
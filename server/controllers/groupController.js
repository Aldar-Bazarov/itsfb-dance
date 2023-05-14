const ApiError = require('../error/ApiError');
const { User, Group } = require('../models/models');

class GroupController {
    async create(req, res, next) {
        try {
            const { name, teacherId, students } = req.body;

            if (students.length >= 12) {
                return next(ApiError.internal('Максимальное количество учеников в группе 12!'));
            }

            const newGroup = await Group.create({ name });
            const teacher = await User.findOne({ where: { id: teacherId } });

            teacher.update({
                ...teacher,
                groupId: newGroup.id
            });
            await teacher.save();

            if (students.length) {
                for (let i = 0; i < students.length; i++) {
                    const student = await User.findOne({ where: { id: students[i].id } });
                    student.update({
                        ...teacher,
                        groupId: newGroup.id
                    });
                    await student.save();
                }
            }
            return res.status(201).json({ message: 'Группа успешно создана' });
        } catch (err) {
            console.error(err);
            return next(ApiError.internal('Не удалось создать группу'));
        }
    };

    async get(req, res, next) {
        try {
            const { groupId } = req.query;

            const group = await Group.findOne({ where: { id: groupId } });
            const teacher = await User.findOne({ where: { groupId, role: "TEACHER" } });
            const students = await User.findAll({ where: { groupId, role: "STUDENT" } });

            return res.status(201).json({ group, teacher, students });
        } catch (err) {
            console.error(err);
            return next(ApiError.internal('Не удалось получить данные о группе'));
        }
    }

    async getAll(req, res, next) {
        try {
            const groups = await Group.findAll();
            return res.status(201).json(groups);
        } catch (err) {
            console.error(err);
            return next(ApiError.internal('Не удалось получить все группы'));
        }
    }

    async addStudent(req, res, next) {
        try {
            const { groupId, studentId } = req.body;
            const students = await User.findAndCountAll({ where: { groupId, role: "STUDENT" } });
            if (students.count >= 12) {
                return next(ApiError.internal('Нельзя добавить ученика в группу, так как группа полная!'));
            }
            const currentStudent = await User.findOne({ where: { id: studentId } });

            currentStudent.update({
                ...currentStudent,
                groupId
            })

            await currentStudent.save();
            return res.status(200).json({ message: "Ученик успешно добавлен в группу" });
        } catch (err) {
            console.error(err);
            return next(ApiError.internal('Не удалось добавить ученика в группу'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id: groupId } = req.params;
            
            await User.update(
                { groupId: null },
                { where: { groupId, role: 'TEACHER' } }
            );

            await User.update(
                { groupId: null },
                { where: { groupId, role: 'STUDENT' } }
            );

            await Group.destroy({ where: { id: groupId } });

            return res.status(201).json({ message: "Группа успешно удалена" });
        } catch (err) {
            console.error(err);
            return next(ApiError.internal('Не удалось получить данные о группе'));
        }
    }
};

module.exports = new GroupController()
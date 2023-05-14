import React, { useEffect, useState } from 'react'
import { getUsersByRole } from '../../../api/userApi'
import { createGroup } from '../../../api/groupApi';
import Modal from '../Modal/Modal'
import styles from './CreateGroup.module.scss'

const CreateGroup = ({ active, setActive }) => {
    const [name, setName] = useState('')
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])
    const [chosenStudents, setChosenStudens] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [searchTerm, setSearchTerm] = useState('')

    const filteredStudents = students.filter((student) =>
        student.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelectChange = (event) => {
        setSelectedTeacher(+event.target.value);
    };

    const addStudent = (student) => {
        const containsObject = chosenStudents.some((el) => el.id === student.id);
        if (!containsObject && chosenStudents.length < 12) {
            setChosenStudens([...chosenStudents, student])
        }
    }

    const deleteStudent = (student) => {
        setChosenStudens(chosenStudents.filter((item) => item.id !== student.id))
    }

    const getTeachers = async () => {
        const teachers = await getUsersByRole("TEACHER")
        console.log(teachers);
        setTeachers(teachers.filter(teacher => teacher.groupId === null));
    }

    const getStudents = async () => {
        const data = await getUsersByRole("STUDENT")
        setStudents(data.sort((a, b) => a.firstname.localeCompare(b.firstname)))
    }

    useEffect(() => {
        getTeachers()
        getStudents()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const group = {
                name,
                teacherId: selectedTeacher,
                students: chosenStudents
            }
            await createGroup(group)
            setActive(false)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Modal active={active} setActive={setActive}>
            <h3>Создать группу:</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Название:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <label htmlFor="teacher">Преподаватель:</label>
                <select
                    required
                    name="teacher"
                    className={styles.teacherSelect}
                    value={selectedTeacher}
                    onChange={handleSelectChange}
                >
                    <option value="">Выберите преподавателя:</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.firstname} {teacher.secondname}
                        </option>
                    ))}
                </select>
                <label htmlFor="students">Ученики:</label>
                <div className={styles.students}>
                    <input type="text" onChange={e => setSearchTerm(e.target.value)} />
                    <ul>
                        {filteredStudents.map((student) => (
                            <li key={student.id} onClick={e => addStudent(student)}>
                                {student.firstname} {student.secondname}
                            </li>
                        ))}
                    </ul>
                </div>
                {chosenStudents.map((student) => (
                    <div key={student.id} className={styles.chosenStudents}>
                        <p>
                            {student.firstname} {student.secondname}
                        </p>
                        <span onClick={() => deleteStudent(student)}>Удалить</span>
                    </div>
                ))}
                <button className={styles.submitButton}>Создать</button>
            </form>
        </Modal>
    );
};

export default CreateGroup;
import React, { useEffect, useState } from 'react';
import { createAttendance, getAttendances } from '../../../api/attendanceApi';
import Modal from '../Modal/Modal';
import styles from './StudentsModal.module.scss';

const StudentsModal = ({ active, setActive, students, currentLesson }) => {
    const [chosenStudents, setChosenStudents] = useState([])

    const getData = async () => {
        try {
            const data = await getAttendances(currentLesson);

            if (data.length) {
                setChosenStudents(students.map(student => {
                    return { 
                        studentId: student.id,
                        presence: data.find(el => el.userId == student.id).presence,
                        firstname: student.firstname,
                        secondname: student.secondname,
                    }
                }))
            } else {
                setChosenStudents(students.map(student => {
                    return { 
                        studentId: student.id,
                        presence: false,
                        firstname: student.firstname,
                        secondname: student.secondname,
                    }
                }))
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const handleSaveButton = async () => {
        if (chosenStudents.length) {
            const data = {
                scheduleId: currentLesson,
                usersId: chosenStudents.map(chosenStudents => chosenStudents.studentId),
                presences: chosenStudents.map(chosenStudents => chosenStudents.presence),
            }
            createAttendance(data)
        }
        setActive(false)
    }

    const handleCheckbox = (e, studentId) => {
        setChosenStudents(prevStudents => {
            const updatedStudents = prevStudents.filter(chosenStudent => studentId !== chosenStudent.studentId);
            return [...updatedStudents, { 
                studentId,
                presence: e.target.checked,
                firstname: students.find(el => el.id === studentId).firstname,
                secondname: students.find(el => el.id === studentId).secondname,
            }].sort((a, b) => a.firstname.localeCompare(b.firstname))
        });
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Modal active={active} setActive={setActive}>
            <h3>Ученики:</h3>
            <ul>
                {chosenStudents.map(student =>
                    <li key={student.studentId}>
                        {student.firstname} {student.secondname}
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={student.presence}
                            onChange={(e) => handleCheckbox(e, student.studentId)}
                        />
                    </li>
                )}
            </ul>
            <button className={styles.saveButton} onClick={handleSaveButton}>
                Сохранить
            </button>
        </Modal>
    );
};

export default StudentsModal;
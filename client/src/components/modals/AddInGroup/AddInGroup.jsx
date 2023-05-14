import React, { useEffect, useState } from 'react'
import { getUsersByRole } from '../../../api/userApi'
import { addStudent, getAllGroups } from '../../../api/groupApi';
import Modal from '../Modal/Modal'
import styles from './AddInGroup.module.scss'

const AddInGroup = ({ active, setActive }) => {
    const [groups, setGroups] = useState([])
    const [students, setStudents] = useState([])
    const [selectedGroup, setSelectedGroup] = useState("")
    const [chosenStudent, setChosenStudent] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredStudents = students.filter((student) =>
        student.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelectChange = (e) => {
        setSelectedGroup(+e.target.value);
    };

    const getStudents = async () => {
        const data = await getUsersByRole("STUDENT")
        setStudents(data.sort((a, b) => a.firstname.localeCompare(b.firstname)))
    }

    const getGroups = async () => {
        const data = await getAllGroups();
        setGroups(data.sort((a, b) => a.name.localeCompare(b.name)));
    }

    useEffect(() => {
        getGroups()
        getStudents()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (!chosenStudent) {
                alert("Выберите ученика, которого хотите добавить в группу")
                return
            }
            await addStudent({ groupId: selectedGroup, studentId: chosenStudent.id })
            setActive(false)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Modal active={active} setActive={setActive}>
            <h3>Добавить ученика в группу:</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="group">Группа:</label>
                <select
                    required
                    name="group"
                    className={styles.groupSelect}
                    value={selectedGroup}
                    onChange={handleSelectChange}
                >
                    <option value="">Выберите группу:</option>
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="students">Ученики:</label>
                <div className={styles.students}>
                    <input type="text" onChange={e => setSearchTerm(e.target.value)} />
                    <ul>
                        {filteredStudents.map((student) => (
                            <li key={student.id} onClick={e => setChosenStudent(student)}>
                                {student.firstname} {student.secondname}
                            </li>
                        ))}
                    </ul>
                </div>
                {chosenStudent &&
                    <p className={styles.chosenStudent}>
                        {chosenStudent.firstname} {chosenStudent.secondname}
                    </p>
                }
                <button className={styles.submitButton}>Добавить</button>
            </form>
        </Modal>
    );
};

export default AddInGroup;
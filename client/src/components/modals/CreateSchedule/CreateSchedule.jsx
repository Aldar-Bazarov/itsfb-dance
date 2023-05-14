import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createSchedule } from '../../../api/scheduleApi'
import { getAllGroups } from '../../../api/groupApi'
import Modal from '../Modal/Modal'
import styles from './CreateSchedule.module.scss'

const CreateSchedule = ({ active, setActive }) => {
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState("")
    const [dates, setDates] = useState([])
    const [chosenDates, setChosenDates] = useState([])

    const getGroups = async () => {
        const data = await getAllGroups()
        setGroups(data.sort((a, b) => a.name.localeCompare(b.name)));
    }

    const handleSelectChange = (e) => {
        setSelectedGroup(+e.target.value)
    }

    useEffect(() => {
        getGroups()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (!chosenDates.length) {
                alert("Выберите дни для создания расписания")
                return
            }
            const scheduleData = {
                groupId: selectedGroup,
                days: chosenDates
            }
            const data = await createSchedule(scheduleData)
            alert(data.message)
            setActive(false)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Modal active={active} setActive={setActive}>
            <h3>Создать расписание:</h3>
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
                <label htmlFor="date">Дата:</label>
                <input
                    type="date"
                    id="first"
                    name="date"
                    required
                    onChange={e => setChosenDates([
                        ...chosenDates.filter(el => el.id !== e.target.id),
                        { id: e.target.id, date: e.target.value}
                    ])}
                />
                {dates.map(el => (
                    <div className={styles.dates} key={el.id}>
                        <input
                            type="date"
                            id={el.id}
                            name="date"
                            required
                            onChange={e => setChosenDates([
                                ...chosenDates.filter(el => el.id !== e.target.id),
                                { id: e.target.id, date: e.target.value}
                            ])}
                        />
                        <button
                            type='button'
                            onClick={e => {
                                setDates(dates.filter(date => date !== el))
                                setChosenDates(chosenDates.filter(date => date.id !== el.id))
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
                <button
                    className={styles.addDateButton}
                    onClick={e => setDates([...dates, { id: uuidv4() }])}
                    type='button'
                >
                    Добавить дату
                </button>
                <button className={styles.submitButton}>Создать</button>
            </form>
        </Modal>
    );
}


export default CreateSchedule
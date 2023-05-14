import React, { useEffect, useState } from 'react'
import { deleteGroup, getAllGroups } from '../../../api/groupApi';
import Modal from '../Modal/Modal'
import styles from './DeleteGroup.module.scss'

const DeleteGroup = ({ active, setActive }) => {
    const [groups, setGroups] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const filteredGroups = groups.filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getGroups = async () => {
        const data = await getAllGroups();
        setGroups(data.sort((a, b) => a.name.localeCompare(b.name)));
    }

    useEffect(() => {
        getGroups()
    }, [])

    const removeGroup = async (group) => {
        try {
            await deleteGroup(group.id)
            setGroups(groups.filter(el => el.id !== group.id))
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Modal active={active} setActive={setActive}>
            <h3>Удалить группу:</h3>
            <label htmlFor="group">Группы:</label>
            <div className={styles.groups}>
                <input
                    type="text" 
                    onChange={e => setSearchTerm(e.target.value)}
                    className={styles.search}
                />
                <ul>
                    {filteredGroups.map((group) => (
                        <li key={group.id}>
                            {group.name}
                            <span onClick={() => removeGroup(group)}>Удалить</span>
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

export default DeleteGroup;
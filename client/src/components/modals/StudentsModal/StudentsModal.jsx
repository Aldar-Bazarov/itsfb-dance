import React from 'react';
import Modal from '../Modal/Modal';
import styles from './StudentsModal.module.scss';

const StudentsModal = ({ active, setActive, students }) => {
    return (
        <Modal active={active} setActive={setActive}>
            <h3>Ученики:</h3>          
            <ul>
                {students.map(student => (
                    <li>
                        {student.firstname} {student.secondname}
                        <input type="checkbox" name="" id="" className={styles.checkbox}/>
                    </li>
                ))}    
            </ul>  
            <button className={styles.saveButton}>Сохранить</button>
        </Modal>
    );
};

export default StudentsModal;
import React, { useEffect, useState, useRef } from 'react'
import clipboardCopy from 'clipboard-copy';
import { getSecretKey, updateSecretKey } from '../../../api/secretKeyApi'
import Modal from '../Modal/Modal'
import styles from './SecretKey.module.scss'

const SecretKey = ({ active, setActive }) => {
    const [studentKey, setStudentKey] = useState(null);
    const [teacherKey, setTeacherKey] = useState(null);

    const studentKeyRef = useRef(null);
    const teacherKeyRef = useRef(null);

    const getKeys = async () => {
        const studentKey = await getSecretKey("STUDENT");
        setStudentKey(studentKey);
        const teacherKey = await getSecretKey("TEACHER");
        setTeacherKey(teacherKey);
    }

    const handleCopyClick = (ref) => {
        if (ref.current) {
            const text = ref.current.innerText;
            clipboardCopy(text);
            alert("Ключ успешно скопирован!")
        }
    };

    const handleUpdateKey = async (role) => {
        const newKey = await updateSecretKey(role);
        if (role === "STUDENT") {
            setStudentKey(newKey)
        } else {
            setTeacherKey(newKey)
        }
    }

    useEffect(() => {
        getKeys();
    }, []);

    return (
        <Modal active={active} setActive={setActive}>
            <h3>Ключи для регистрации:</h3>
            <p className={styles.keyDescription}>Ключ для учителей:</p>
            <div className={styles.key}>
                <p className={styles.secretKey} ref={teacherKeyRef}>
                    {teacherKey}
                    <span 
                        className={styles.copyIcon}
                        onClick={() => handleCopyClick(teacherKeyRef)}
                    />
                </p>
                <button
                    className={styles.updateButton}
                    onClick={() => handleUpdateKey("TEACHER")}
                >
                    Обновить
                </button>
            </div>
            <p className={styles.keyDescription}>Ключ для учеников:</p>
            <div className={styles.key}>
                <p className={styles.secretKey} ref={studentKeyRef}>
                    {studentKey}
                    <span
                        className={styles.copyIcon}
                        onClick={() => handleCopyClick(studentKeyRef)}
                    />
                </p>
                <button
                    className={styles.updateButton}
                    onClick={() => handleUpdateKey("STUDENT")}
                >
                    Обновить
                </button>
            </div>
        </Modal>
    );
};

export default SecretKey;
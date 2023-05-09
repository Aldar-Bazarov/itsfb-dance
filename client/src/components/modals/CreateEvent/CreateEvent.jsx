import React, { useState } from 'react';
import { createEvent } from '../../../api/eventApi';
import Modal from '../Modal/Modal';
import styles from './CreateEvent.module.scss';

const CreateEvent = ({ active, setActive}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [place, setPlace] = useState('');
    const [fileName, setFileName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', content);
        formData.append('date', date);
        formData.append('time', time);
        formData.append('place', place);
        formData.append('img', image);
        await createEvent(formData);
        setActive(false);
    }

    const handleFileChange = (event) => {
        try {
            const file = event.target.files[0];
            setImage(file);
            setFileName(file.name);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal active={active} setActive={setActive}>
            <h3>Опубликовать мероприятие:</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Оглавление:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="content">Содержание:</label>
                <input
                    type="text"
                    id="body"
                    name="content"
                    required
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <label htmlFor="place">Место:</label>
                <input
                    type="text"
                    id="place"
                    name="place"
                    required
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                />
                <label htmlFor="date">Дата:</label>
                <input 
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <label htmlFor="time">Время:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    value={time}
                    onChange={e => setTime(e.target.value)}
                />
                <label htmlFor="file">Изображение:</label>
                <input type="file" id="file" onChange={handleFileChange} required />
                <label htmlFor="file" className={styles.fileUpload}>
                    {fileName || "Выберите файл"}
                </label>
                <button className={styles.submitButton}>Опубликовать</button>
            </form>
        </Modal>
    );
};

export default CreateEvent;
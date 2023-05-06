import React, { useState } from 'react';
import styles from './CreateNews.module.scss';
import Modal from '../Modal/Modal';
import { createNews } from '../../../api/newsApi';

const CreateNews = ({ active, setActive }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [fileName, setFileName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('img', image);
        await createNews(formData);
        setActive(false);
    }

    const handleFileChange = (event) => {
        try {
            const file = event.target.files[0];
            setImage(file);
            setFileName(file.name);
            console.log(fileName);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal active={active} setActive={setActive}>
            <h3>Опубликовать новость:</h3>
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
                <label htmlFor="file">Изображение:</label>
                <input type="file" id="file" onChange={handleFileChange} required />
                <label htmlFor="file" className={styles.fileUpload}>
                    {fileName || "Выберите файл"}
                </label>
                <button>Опубликовать</button>
            </form>
        </Modal>
    );
};

export default CreateNews;
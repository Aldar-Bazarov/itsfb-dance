import React, { useState } from 'react';
import CreateNews from '../../components/modals/CreateNews/CreateNews';
import CreateEvent from '../../components/modals/CreateEvent/CreateEvent';
import styles from './Admin.module.scss';

const Admin = () => {
  const [newsVisible, setNewsVisible] = useState(false);
  const [eventVisible, setEventVisible] = useState(false);

  return (
    <div className={styles.admin}>
      <h1>Админ панель</h1>
      <button onClick={() => setNewsVisible(true)}>
        Добавить новость
      </button>
      <button onClick={() => setEventVisible(true)}>
        Добавить событие
      </button>
      <CreateNews active={newsVisible} setActive={setNewsVisible}/>
      <CreateEvent active={eventVisible} setActive={setEventVisible}/>
    </div>
  )
}

export default Admin
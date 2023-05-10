import React, { useState } from 'react';
import CreateNews from '../../components/modals/CreateNews/CreateNews';
import CreateEvent from '../../components/modals/CreateEvent/CreateEvent';
import styles from './Admin.module.scss';
import SecretKey from '../../components/modals/SecretKey/SecretKey';

const Admin = () => {
  const [newsVisible, setNewsVisible] = useState(false);
  const [eventVisible, setEventVisible] = useState(false);
  const [secretKeyVisible, setSecretKeyVisible] = useState(false);

  return (
    <div className={styles.admin}>
      <h1>Админ панель</h1>
      <button className={styles.adminButton} onClick={() => setSecretKeyVisible(true)}>
        Ключи для регистрации
      </button>
      <button className={styles.adminButton} onClick={() => setNewsVisible(true)}>
        Добавить новость
      </button>
      <button className={styles.adminButton} onClick={() => setEventVisible(true)}>
        Добавить событие
      </button>
      {secretKeyVisible && <SecretKey active={secretKeyVisible} setActive={setSecretKeyVisible}/>}
      {newsVisible && <CreateNews active={newsVisible} setActive={setNewsVisible}/>}
      {eventVisible && <CreateEvent active={eventVisible} setActive={setEventVisible}/>}
    </div>
  )
}

export default Admin
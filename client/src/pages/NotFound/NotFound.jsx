import React from 'react';
import styles from './NotFound.module.scss';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
        <h1>Страница с таким адресом не найдена...</h1>
        <div
          style={{backgroundImage: `url(/images/not-found.png)`}}
          className={styles.notFoundImage}
        />
        <NavLink to='/' className={styles.homeButton}>Вернуться на главную</NavLink>
    </div>
  )
}

export default NotFound
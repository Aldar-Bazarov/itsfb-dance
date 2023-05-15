import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/slices/user.slice';
import styles from './Header.module.scss';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const isAdmin = user.role === "ADMIN" ? true : false;
    const isTeacher = user.role === "TEACHER" ? true : false;

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch(clearUser())
    }

    return (
        <header className={styles.header}>
            <NavLink
                to='/'
                className={styles.icon}
                id={styles.logo}
            />
            <nav className={styles.navigation}>
                <NavLink
                    to='/'
                    className={styles.icon}
                    id={styles.news}
                />
                <NavLink
                    to='/events'
                    className={styles.icon}
                    id={styles.events}
                />
                <NavLink
                    to='/school'
                    className={styles.icon}
                    id={styles.school}
                />
                <NavLink
                    to='/profile'
                    className={styles.icon}
                    id={styles.profile}
                />
                {
                    !isAdmin &&
                    <NavLink
                        to='/group'
                        className={styles.icon}
                        id={styles.group}
                    />
                }
                {
                    !isAdmin &&
                    <NavLink
                        to='/schedule'
                        className={styles.icon}
                        id={styles.schedule}
                    />
                }
                {
                    isAdmin &&
                    <NavLink
                        to='/admin'
                        className={styles.icon}
                        id={styles.admin}
                    />
                }
                {
                    isTeacher &&
                    <NavLink
                        to='/attendance'
                        className={styles.icon}
                        id={styles.admin}
                    />
                }
            </nav>
            <NavLink
                to='/login'
                className={styles.icon}
                id={styles.logout}
                onClick={logOut}
            />
        </header>
    )
}

export default Header
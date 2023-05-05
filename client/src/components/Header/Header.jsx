import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './Header.module.scss';

import Logo from '../../assets/images/header/Logo.png';
import News from '../../assets/images/header/News.png';
import Events from '../../assets/images/header/Events.png';
import School from '../../assets/images/header/Schools.png';
import Profile from '../../assets/images/header/Profile.png';
import Group from '../../assets/images/header/MySchool.png';
import Schedule from '../../assets/images/header/Schedule.png';
import Logout from '../../assets/images/header/Logout.png';

const Header = () => {
    const logOut = () => {
        localStorage.removeItem('token');
    }

    return (
        <header className={styles.header}>
            <NavLink to='/' className={styles.logo}>
                <img src={Logo} alt='logo' />
            </NavLink>
            <nav className={styles.navigation}>
                <NavLink to='/'>
                    <img src={News} alt='news' />
                </NavLink>
                <NavLink to='/events'>
                    <img src={Events} alt='events' />
                </NavLink>
                <NavLink to='/school'>
                    <img src={School} alt='school' />
                </NavLink>
                <NavLink to='/profile'>
                    <img src={Profile} alt='profile' />
                </NavLink>
                <NavLink to='/group'>
                    <img src={Group} alt='group' />
                </NavLink>
                <NavLink to='/schedule'>
                    <img src={Schedule} alt='schedule' />
                </NavLink>
            </nav>
            <NavLink to='/login' className={styles.logout} onClick={logOut}>
                <img src={Logout} alt='logout' />
            </NavLink>
        </header>
    )
}

export default Header
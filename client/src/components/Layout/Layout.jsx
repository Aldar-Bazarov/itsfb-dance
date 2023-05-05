import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../Header/Header';
import styles from './Layout.module.scss'

const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.container}>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout
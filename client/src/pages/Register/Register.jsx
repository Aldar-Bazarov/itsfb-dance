import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { registration } from "../../api/userApi";
import AuthImage from '../../assets/images/auth-image.png'
import styles from './Register.module.scss'

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [secondname, setSecondname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const signUp = async (e, userData) => {
        e.preventDefault()
        try {
            await registration(userData)
            alert("Регистрация прошла успешно!")
        } catch (error) {
            alert(error.message)
            throw error
        }
    }

    return (
        <div className={styles.loginPage}>
            <img src={AuthImage} alt="auth" className={styles.authImage} />
            <form onSubmit={e => signUp(e, { firstname, secondname, email, password, secretKey })}>
                <h2>Регистрация</h2>
                <label htmlFor="firstname">Имя</label>
                <input
                    required
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                />
                <label htmlFor="secondname">Фамилия</label>
                <input
                    required
                    type="text"
                    id="secondname"
                    name="secondname"
                    value={secondname}
                    onChange={e => setSecondname(e.target.value)}
                />
                <label htmlFor="mail">Почта</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password">Пароль</label>
                <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="secretKey">Ключ для регистрации</label>
                <input
                    required
                    type="text"
                    id="secretKey"
                    name="secretKey"
                    value={secretKey}
                    onChange={e => setSecretKey(e.target.value)}
                />
                <div className={styles.loginSubmit}>
                    <p>
                        Есть аккаунт?<br />
                        <NavLink to={'/login'} className={styles.link}>
                            Войти
                        </NavLink>
                    </p>
                    <button>
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
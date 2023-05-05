import React, { useState } from "react";
import styles from './Register.module.scss'
import AuthImage from '../../assets/images/auth-image.png'
import { NavLink } from "react-router-dom";
// import { registration } from "../../api/userApi";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async (userData) => {
        try {
            const response = await axios.post('http://localhost:4000/api/user/registration', userData);
            console.log(jwtDecode(response.data.token));
            return response.data;
        } catch (error) {
            alert(error.response.data.message);
            throw error;
        }
    }

    return (
        <div className={styles.loginPage}>
            <img src={AuthImage} alt="auth" className={styles.authImage} />
            <form onSubmit={(e) => e.preventDefault()}>
                <h2>Регистрация</h2>

                <label htmlFor="name">Имя</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                {/* <label for="surname">Фамилия</label>
                <input type="text" id="surname" name="surname" required /> */}

                <label htmlFor="mail">Почта</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                {/* <label for="confirm-password">Повторите пароль</label>
                <input type="password" id="confirm-password" name="confirm-password" required /> */}

                <div className={styles.loginSubmit}>
                    <p>Есть аккаунт?<br /><NavLink to={'/login'}>Войти</NavLink></p>
                    <button
                        type="submit"
                        onClick={() => signUp({ username, email, password })}
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
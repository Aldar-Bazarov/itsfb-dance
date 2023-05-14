import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../api/userApi";
import { setUser } from "../../store/slices/user.slice";
import styles from './Login.module.scss'
import AuthImage from '../../assets/images/auth-image.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const location = useLocation();
    // const fromPage = location.state?.from?.pathname || '/profile';

    const signIn = async (e, userData) => {
        e.preventDefault();
        try {
            const data = await login(userData);
            dispatch(setUser(data));
            navigate('/profile');
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className={styles.loginPage}>
            <img src={AuthImage} alt="auth" className={styles.authImage} />
            <form onSubmit={(e) => signIn(e, { email, password })}>
                <h2>Вход</h2>
                <label htmlFor="mail">Почта</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className={styles.loginSubmit}>
                    <p>
                        Нет аккаунта?<br /><NavLink to={'/register'}>Зарегистрироваться</NavLink>
                    </p>
                    <button>Войти</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
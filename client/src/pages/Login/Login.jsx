import React, { useState } from "react";
import styles from './Login.module.scss'
import AuthImage from '../../assets/images/auth-image.png'
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const user = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const signIn = async (e, userData) => {
        e.preventDefault();
        login(userData)
            .then((response) => {
                console.log(response);
                dispatch(setUser(response));
                navigate('/profile');
            }, (reject) => {
                alert(reject.message);
            });
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
                    <p>Нет аккаунта?<br /><NavLink to={'/register'}>Зарегистрироваться</NavLink></p>
                    <button
                        type="submit"
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
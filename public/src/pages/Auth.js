import React, { useState, useEffect, useContext } from 'react';
import md5 from 'md5';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/auth.context';

export function Auth(){
    // в auth сохранён контекст AuthContext
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, setError, clearError } = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    function changeHandler(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function loginHandler() {
        try {
            const { email, password } = form;
            if (email && password) {
                const random = Math.random();
                const hash = md5(md5(email + password) + random);
                const result = await request('/user/login', 'POST', { email: email, hash: hash, random: random });
                auth.login(result.data.id, result.data.token, result.data.type);
                console.log(result);
            } else {
                setError('Заполните все поля');
            }
        } catch (e) {

        }
    }

    return (
        <div>
            <h3 className="center-align">Библиотека Онлайн</h3>
            <div className="login-form">
                <h4 className="center-align">Авторизация</h4>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        placeholder="Ввдеите email"
                        onChange={changeHandler}/>
                </div>
                <div>
                    <label>Пароль</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        placeholder="Введите пароль"
                        onChange={changeHandler}/>
                </div>
                <div className="center-align">
                    <input
                        className="orange darken-1 waves-effect waves-light btn"
                        value="Войти"
                        type="button"
                        style={{margin: "1rem"}}
                        onClick={loginHandler}
                        disabled={loading} />
                </div>
                <div className="center-align">
                    <a href="/registr">Зарегестрироваться</a>
                    <span style={{ margin: "1rem" }}>|</span>
                    <a href="/forgot-password">Забыли пароль</a>
                </div>
            </div> 
        </div>
        
    );
}
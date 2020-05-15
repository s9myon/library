import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';

export function Auth(){
    const { loading, request } = useHttp();
    const [form, setForm] = useState({
        email: '', hash: ''
    });

    function changeHandler(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    // async function registerHandler() {
    //     // const login = document.querySelector('#loginRegistr').value;
    //     // const password = document.querySelector('#passwordRegistr').value;
    //     // const name = document.querySelector('#nameRegistr').value;
    //     // if (login && password && name) {
    //     //     let hash = md5(password + login);
    //     //     socket.emit(this.MESSAGES.USER_REGISTRATION, { login, hash, name });
    //     // }
    //     try {
    //         const data = await request('/register', 'POST', {...form});
    //         console.log('Data', data);
    //     } catch (e) {

    //     }
    // }

    return (
        <div className="login-form">
            <h3 className="center-align">Library</h3>
            <h4 className="center-align">Добро пожаловать</h4>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ввдеите email"
                    onChange={changeHandler}/>
            </div>
            <div>
                <label>Пароль</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    onChange={changeHandler}/>
            </div>
            <div className="center-align">
                <input
                    className="orange darken-1 waves-effect waves-light btn"
                    value="Войти"
                    type="button"
                    disabled={loading} />
            </div>
            <div className="center-align">
                <a href="/registr">Зарегестрироваться</a>
                <span>|</span>
                <a href="/forgot-password">Забыли пароль</a>
            </div>
        </div>
    );
}
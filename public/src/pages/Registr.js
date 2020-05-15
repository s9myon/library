import React, { useState } from 'react';
import md5 from 'md5';
import { useHttp } from '../hooks/http.hook';

export function Registr(){
    const { loading, request } = useHttp();
    const [form, setForm] = useState({
        email: '', password1: '', password2: '', name: ''
    });

    function changeHandler(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function registerHandler() {
        // const login = document.querySelector('#loginRegistr').value;
        // const password = document.querySelector('#passwordRegistr').value;
        // const name = document.querySelector('#nameRegistr').value;
        // if (login && password && name) {
        //     let hash = md5(password + login);
        //     socket.emit(this.MESSAGES.USER_REGISTRATION, { login, hash, name });
        // }
        try {
            const { email, password1, password2, name } = form;
            if (email && password1 && password2 && name) {
                if(password1 === password2) {
                    let hash = md5(email + password1);
                    const data = await request('/register', 'POST', { email: email, hash: hash, name: name });
                    console.log('Data', data);
                } else {
                    console.log('Введите одинаковые пароли');
                }
            } else {
                console.log('Заполните все поля');
            }
            
            // const data = await request('/register', 'POST', {...form});
            // console.log('Data', data);
        } catch (e) {

        }
    }

    return (
        <div className="login-form">
            <h4 className="center-align">Регистрация</h4>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Ввдеите ваш email"
                    onChange={changeHandler}/>
            </div>
            <div>
                <label>Пароль</label>
                <input
                    type="password"
                    name="password1"
                    placeholder="Введите пароль"
                    onChange={changeHandler}/>
            </div>
            <div>
                <label>Повтрите пароль</label>
                <input
                    type="password"
                    name="password2"
                    placeholder="Введите пароль"
                    onChange={changeHandler}/>
            </div>
            <div>
                <label>Имя</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Введите ваше имя"
                    onChange={changeHandler}/>
            </div>
            <input
                className="orange darken-1 waves-effect waves-light btn"
                value="Зарегистрироваться"
                type="button"
                onClick={registerHandler}
                disabled={loading} />
        </div>
    );
}
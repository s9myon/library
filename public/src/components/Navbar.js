import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';

export function Navbar() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();

    async function logoutHandler(event) {
        try {
            // preventDefault отменяет обработку ссылки
            event.preventDefault();
            let result = await request('/user/logout', 'POST', { token: auth.token });
            if (result) {
                auth.logout();
                history.push("/");
            }
        } catch(e) {

        }
        
    }

    return (
        <nav>
            <div
                className="nav-wrapper teal darken-3"
                style={{ padding: '0 2rem' }}>
                <span className="brand-logo">
                        Библиотека Онлайн
                </span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to={'/home'}>Главная</NavLink></li>
                    <li><NavLink to={'/library'}>Найти книгу</NavLink></li>
                    <li><a href={"/"} onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    );
}

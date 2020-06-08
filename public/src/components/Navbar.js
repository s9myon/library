import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';

export function Navbar() {
    const history = useHistory();
    const { logout, isAuth, type, token } = useContext(AuthContext);
    const { request } = useHttp();

    async function logoutHandler(event) {
        try {
            // preventDefault отменяет обработку ссылки
            event.preventDefault();
            let result = await request('/user/logout', 'POST', { token: token });
            if (result) {
                logout();
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
                { isAuth
                ?   (type !== "admin")
                    ?   <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><NavLink to={'/home'}>Главная</NavLink></li>
                            <li><NavLink to={'/library'}>Найти книгу</NavLink></li>
                            <li><NavLink to={'/wishlist'}>Лист ожидания</NavLink></li>
                            <li><a href={"/"} onClick={logoutHandler}>Выйти</a></li>
                        </ul>
                    :   <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><NavLink to={'/home'}>Главная</NavLink></li>
                            <li><NavLink to={'/library'}>Найти книгу</NavLink></li>
                            <li><a href={"/"} onClick={logoutHandler}>Выйти</a></li>
                        </ul>
                :   <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to={'/library'}>Найти книгу</NavLink></li>
                        <li><NavLink to={'/auth'}>Войти</NavLink></li>
                    </ul>}
                
            </div>
        </nav>
    );
}

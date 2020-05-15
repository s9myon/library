import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="nav-wrapper">
            <div className="navbar-brand">
                LIBRARY
            </div>

            <ul className="right hide-on-med-and-down">
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/"
                        exact
                    >
                        Главная
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/about"
                    >
                        Информация
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/auth"
                        >
                            Авторизация
                        </NavLink>
                    
                </li>
            </ul>
        </nav>
    );
}

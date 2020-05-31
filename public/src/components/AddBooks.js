import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';


export function AddBooks() {
    const { loading } = useHttp();
    const [form, setForm] = useState('');

    function changeHandler(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    function keyPressHandler() {

    }

    return(
        <div className="row">
            <div className="col s12">
                <div className="card white">
                    <div className="card-content black-text">
                        <span className="card-title">Добавить книгу</span>
                        <div>
                            <label>Книга</label>
                            <input
                                type="text"
                                name="book"
                                value={form.book}
                                placeholder="Введите название книги"
                                onChange={changeHandler}/>
                        </div>
                        <div>
                            <div>
                                <label>Имя</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    placeholder="Введите имя автора"
                                    onChange={changeHandler} />
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <label>Фамилия</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={form.surname}
                                        placeholder="Введите фамилия автора"
                                        onChange={changeHandler} />
                                </div>
                                <div className="col s6">
                                    <label>Отчество</label>
                                    <input
                                        type="text"
                                        name="middleName"
                                        value={form.middleName}
                                        placeholder="Введите отчество автора"
                                        onChange={changeHandler} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <div>
                            <input
                                className="orange darken-1 waves-effect waves-light btn"
                                value="Найти"
                                type="button"
                                onClick={keyPressHandler}
                                disabled={loading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
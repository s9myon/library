import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';


export function AddBooks(props) {
    const { loading } = useHttp();
    let updateForm = props.updateForm;
    let bookFormHandler = props.bookFormHandler;
    const [form, setForm] = useState({
        book: '',
        name: '',
        surname: '',
        middleName: ''
    });
    

    function changeHandler(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
        updateForm(event.target.name, event.target.value);
    }

    return(
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
                            onChange={changeHandler}
                            placeholder="Введите название книги"/>
                    </div>
                    <div>
                        <div>
                            <label>Имя</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={changeHandler}
                                placeholder="Введите имя автора"/>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <label>Фамилия</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={form.surname}
                                    onChange={changeHandler}
                                    placeholder="Введите фамилия автора"/>
                            </div>
                            <div className="col s6">
                                <label>Отчество</label>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={form.middleName}
                                    onChange={changeHandler}
                                    placeholder="Введите отчество автора"/>
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
                            onClick={bookFormHandler}
                            disabled={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
}
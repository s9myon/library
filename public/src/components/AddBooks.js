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
        middleName: '',
        yearOfIssue: '',
        publishingHouse: ''
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
                            <label>Фамилия</label>
                            <input
                                type="text"
                                name="surname"
                                value={form.surname}
                                onChange={changeHandler}
                                placeholder="Введите фамилия автора"/>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <label>Имя</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={changeHandler}
                                    placeholder="Введите имя автора"/>
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
                    <div>
                        <label>Год издания</label>
                        <input
                            type="text"
                            name="yearOfIssue"
                            value={form.yearOfIssue}
                            onChange={changeHandler}
                            placeholder="Введите год издания книги"/>
                    </div>
                    <div>
                        <label>Издательство</label>
                        <input
                            type="text"
                            name="publishingHouse"
                            value={form.publishingHouse}
                            onChange={changeHandler}
                            placeholder="Введите название издательства книги"/>
                    </div>
                </div>
                <div className="card-action">
                    <div>
                        <input
                            className="orange darken-1 waves-effect waves-light btn"
                            value="Добавить"
                            type="button"
                            onClick={bookFormHandler}
                            disabled={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
}
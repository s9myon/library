import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';


export function GivingBook(props) {
    const { loading } = useHttp();
    let updateForm = props.updateForm;
    let giveBookHandler = props.giveBookHandler;
    const [form, setForm] = useState({
        email: '',
        bookId: ''
    });
    

    function changeHandler(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
        updateForm(event.target.name, event.target.value);
    }

    return(
        <div className="col s12">
            <div className="card white">
                <div className="card-content black-text">
                    <span className="card-title">Отдать книгу</span>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={changeHandler}
                            placeholder="Введите email читателя"/>
                    </div>
                    <div>
                        <label>Книга</label>
                        <input
                            type="text"
                            name="bookId"
                            value={form.bookId}
                            onChange={changeHandler}
                            placeholder="Введите идентификационный номер экземпляра"/>
                    </div>
                </div>
                <div className="card-action">
                    <div>
                        <input
                            className="orange darken-1 waves-effect waves-light btn"
                            value="Отдать"
                            type="button"
                            onClick={giveBookHandler}
                            disabled={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
}
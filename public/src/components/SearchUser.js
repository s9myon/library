import React, {useState} from 'react';
import { useHttp } from '../hooks/http.hook';

export function SearchUser() {
    const { loading } = useHttp();
    const [form, setForm] = useState('');

    function changeHandler(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    function keyPressHandler() {

    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="card white">
                    <div className="card-content black-text">
                        <span className="card-title">Найти читателя</span>
                        <div>
                            <label>Имя</label>
                            <input
                                type="text"
                                name="author"
                                value={form.author}
                                placeholder="Введите ФИО читателя"
                                onChange={changeHandler}/>
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="text"
                                name="author"
                                value={form.author}
                                placeholder="Введите email читателя"
                                onChange={changeHandler}/>
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
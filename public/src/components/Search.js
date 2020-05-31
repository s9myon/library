import React, {useState} from 'react';
import { useHttp } from '../hooks/http.hook';

export function Search() {
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
                        <span className="card-title">Поиск</span>
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
                            <label>Автор</label>
                            <input
                                type="text"
                                name="author"
                                value={form.author}
                                placeholder="Введите имя автора"
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
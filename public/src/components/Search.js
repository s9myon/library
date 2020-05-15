import React, {useState} from 'react';

export function Search() {
    const [query, setQuery] = useState('');

    function addQuery(event) {
        setQuery()
    }

    return (
        <div class="form-inline">
            <input
                type="text"
                className="form-control mb-2 mr-sm-2"
                id="book_title"
                placeholder="Название книги"
                value={query.book}
            />
            <input
                type="text"
                className="form-control mb-2 mr-sm-2"
                id="author_name"
                placeholder="Имя автора"
                value={query.author}
            />
            <input
                type="text"
                className="form-control mb-2 mr-sm-2"
                id="library_title"
                placeholder="Название библиотеки"
                value={query.library}
            />
            <button
                type="submit"
                className="btn btn-primary mb-2"
                onClick={addQuery}>
                    Поиск
            </button>
        </div>
  
    );
}
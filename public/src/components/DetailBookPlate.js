import React from 'react';

export function DetailBookPlate({ books, pressHandler }) {
    return (
        <ul className="collection">
            {books.map(book => {
                return(
                    <li className="collection-item"
                        key={ book.id }
                        style={{ paddingTop: '2rem', paddingBottom: '2rem'}}>
                        <div>
                            <span
                                style={{ fontWeight: "bold" }}>
                                    { book.book }
                            </span>
                            <button
                                className="teal darken-1 waves-effect waves-light btn secondary-content"
                                id={ book.id }
                                onClick={ pressHandler }
                            >Подробнее<i
                                className="material-icons right"
                                id={ book.id }
                                >info_outline</i>
                            </button><br/>
                            { book.surname + " " + book.name + " " + book.middleName }<br/>
                        </div>
                    </li>);
            })}
        </ul>
    );
}
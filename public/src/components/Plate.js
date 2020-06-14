import React from 'react';

export function Plate({ books, isAuth, type, changeStatus }) {
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
                            { isAuth && (type = "admin")
                                ?   <button
                                        className="teal darken-1 waves-effect waves-light btn secondary-content"
                                        id={ book.id }
                                        onClick={ changeStatus }>
                                            Вернуть книгу
                                            <i  className="material-icons left"
                                                id={ book.id }>
                                                    book
                                            </i>
                                    </button>
                                :   null
                            }<br/>
                            { book.surname + " " + book.name + " " + book.middleName }<br/>
                            <span>Дата взятия: { book.dateTaken }</span>
                        </div>
                            
                    </li>);
            })}
        </ul>
    );
}
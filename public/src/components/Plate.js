import React from 'react';

export function Plate({ books, pressHandler }) {
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
                        { !book.dateTaken ?
                            <input
                                className="teal darken-3 waves-effect waves-light btn secondary-content"
                                id={ book.id }
                                onClick={ pressHandler }
                                value="Подробнее"
                                type="button"/> :
                            null } <br/>
                        { book.surname + " " + book.name + " " + book.middleName }<br/>
                        { book.dateTaken ? <span>Дата взятия: { book.dateTaken }</span> : null }
                    </div>
                    
                </li>)
            })}
        </ul>
    );
}
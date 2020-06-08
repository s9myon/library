import React from 'react';

export function WishPlate({ wish, pressHandler }) {
    return (
        <ul className="collection">
            {wish.map(book => {
                return(
                <li className="collection-item"
                    key={ book.id }
                    id={ book.id }
                    style={{ paddingTop: '2rem', paddingBottom: '2rem'}}>
                    <div>
                        <span
                            style={{ fontWeight: "bold" }}>
                                { book.title }
                        </span>
                        <button
                            className="red accent-4 waves-effect waves-light btn secondary-content"
                            id={ book.id }
                            value={ book.id }
                            onClick={ pressHandler }>
                                <i className="material-icons">close</i>
                        </button><br/>
                        { book.surname + " " + book.name + " " + book.middleName }<br/>
                        <span className="center-align" style={{ fontWeight: "bold" }}>Статус: </span>
                        { book.dateTaken === null
                            ? <span>На данный момент в библиотеке нет ни одного экземпляра данной книги</span>
                            : <span>В библиотеке есть экземпляр данной книги. Вы можете прийти и забрать его</span>}
                    </div>
                    
                </li>)
            })}
        </ul>
    );
}
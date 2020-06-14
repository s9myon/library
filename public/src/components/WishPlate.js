import React from 'react';

export function WishPlate({ wishes, pressHandler }) {
    return (
        <ul className="collection">
            {wishes.map(wish => {
                return(
                <li className="collection-item"
                    key={ wish.id }
                    id={ wish.id }
                    style={{ paddingTop: '2rem', paddingBottom: '2rem'}}>
                    <div>
                        <span
                            style={{ fontWeight: "bold" }}>
                                { wish.title }
                        </span>
                        <button
                            className="red accent-4 waves-effect waves-light btn secondary-content"
                            id={ wish.id }
                            value={ wish.id }
                            onClick={ pressHandler }>
                                <i  className="material-icons"
                                    id={ wish.id }
                                    value={ wish.id }>close</i>
                        </button><br/>
                        { wish.surname + " " + wish.name + " " + wish.middleName }<br/>
                        <span className="center-align" style={{ fontWeight: "bold" }}>Статус: </span>
                        { wish.dateTaken === null
                            ? <span>В библиотеке есть это издание. Вы можете прийти и забрать его</span>
                            : <span>На данный момент в библиотеке нет этого издания</span>}
                    </div>
                    
                </li>)
            })}
        </ul>
    );
}
import React from 'react';

export function UserPlate({ users, pressHandler }) {
    return (
        <ul className="collection">
            {users.map(user => {
                return(
                    <li className="collection-item"
                        key={ user.id }
                        style={{ paddingTop: '1rem', paddingBottom: '1rem', listStyleType: 'none' }}>
                        <div>
                            <span style={{ fontWeight: "bold" }}>Имя: </span>
                            <span>{ user.name }</span>
                            <button
                                className="teal darken-1 waves-effect waves-light btn secondary-content"
                                id={ user.id }
                                onClick={ pressHandler }>
                                    Подробнее
                                    <i
                                        className="material-icons right"
                                        id={ user.id }
                                        >info_outline</i>
                            </button><br/>
                            <span style={{ fontWeight: "bold" }}>Email: </span>
                            <span>{ user.email }</span>
                        </div>
                    </li>);
            })}
        </ul>
    );
}
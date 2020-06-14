import React from 'react';

export function InstancePlate({ instances, addWishHandler, isAuth, type }) {
    return (
        <ui className="collection">
            {instances.map(instance => {
                return(
                    <li className="collection-item"
                        key={instance.id}
                        style={{ paddingTop: '2rem', paddingBottom: '2rem', listStyleType: 'none' }}>
                            <div>
                                <span
                                    style={{ fontWeight: "bold" }}>
                                        { instance.title }
                                </span>
                                { (isAuth && (type !== "admin"))
                                    ?  <button
                                            className="teal darken-1 waves-effect waves-light btn secondary-content"
                                            id={ instance.id }
                                            style={{ marginLeft: "1rem" }}
                                            onClick={ addWishHandler }>
                                                Добавить в лист ожидания
                                                <i className="material-icons left">add</i>
                                        </button>
                                    :   null } <br/>
                                { instance.surname + " " + instance.name + " " + instance.middleName }<br/>
                                { "Идентификационный номер: " + instance.id }<br/>
                                { "Издательство: " + instance.publishingHouse }<br/>
                                { "Год издания: " + instance.yearOfIssue }<br/>
                                { type === "admin"
                                    ? instance.dateTaken !== null
                                        ? <span>Статус: На данный момент в библиотеке нет этого издания.</span>
                                        : <span>Статус: Данное издание находиться в библиотеке.</span>
                                    : instance.dateTaken !== null
                                        ? <span>Статус: На данный момент в библиотеке нет этого издания.</span>
                                        : <span>Статус: Данное издание находиться в библиотеке. Вы можете прийти и забрать его.</span> }
                            </div>
                    </li>
                );
            })}
        </ui>
    );
}
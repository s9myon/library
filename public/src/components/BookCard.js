import React, { Fragment } from 'react';

export function BookCard({ book, addWishHandler, isAuth, type }) {
    return (
        <Fragment>
            <div className="row">
                <div className="col s12" style={{ paddingTop: "1rem" }}>
                    <div className="card white">
                        <div className="card-content black-text">
                            <span className="card-title">{ book.book.book }</span>
                            <p>{ book.book.surname + " " + book.book.name + " " + book.book.middleName }</p>
                        </div>
                            { (book.instances.length !== 0)
                                ?  <div>
                                        <span className="card-content black-text">
                                            Экземпляры книги в наличии
                                        </span><br/>
                                        <span className="card-content black-text">
                                            {"Всего экземпляров: " + book.instances.length}
                                        </span><br/>
                                        <span className="card-content black-text">
                                            {"Экземпляры находящиеся в библиотеке: " + book.instances.filter((instance) => {
                                                if(instance.holder === null) {
                                                    return true;
                                                }
                                                return false;
                                            }).length}
                                        </span>
                                    </div>
                                :   <div>
                                        <span className="card-content black-text">
                                            Этой книги нет в наличии
                                        </span>
                                    </div>
                            }
                        { (isAuth && (type !== "admin"))
                            ?   <div className="card-action" style={{ marginTop: "1rem" }}>
                                    <button
                                        className="teal darken-1 waves-effect waves-light btn"
                                        id={ book.book.id }
                                        style={{ marginLeft: "1rem" }}
                                        onClick={ addWishHandler }>
                                            Добавить в лист ожидания
                                            <i className="material-icons left">add</i>
                                    </button>
                                </div>
                            :   null }
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
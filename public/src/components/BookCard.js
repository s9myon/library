import React, { Fragment } from 'react';

export function BookCard({ book }) {
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
                                            {"Всего экземпляров в библиотеке: " + book.instances.length}
                                        </span><br/>
                                        <span className="card-content black-text">
                                            {"Книг в наличии: " + book.instances.filter((instance) => {
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
                        <div className="card-action" style={{ marginTop: "1rem" }}>
                            <a href="/">Написать рецензию</a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
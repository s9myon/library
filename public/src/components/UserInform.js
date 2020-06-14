import React, { Fragment } from 'react';
import { Plate } from '../components/Plate';

export function UserInform({ user, books, isAuth, type, changeStatus }) {
    return (
        <Fragment>
            <div className="row">
                <div className="col s12" style={{ marginTop: "1rem" }}>
                    <div className="card white">
                        <div className="card-content black-text">
                            <div>
                                <span className="card-title">Информация о читателе</span>
                            </div>
                            <div style={{ marginLeft: "1rem" }}>
                                <label>Имя читателя</label>
                                <span className="card-title">{ user.name }</span><br/>
                            </div>
                            <div style={{ marginLeft: "1rem" }}>
                                <label>Email читателя</label>
                                <span className="card-title">{ user.email }</span>
                            </div>
                            <div style={{ marginTop: "4rem" }}>
                                <span className="card-title">Книги на руках:</span>
                            </div>
                            {   (books !== [])
                                ?   <Plate
                                        books={ books }
                                        isAuth={ isAuth }
                                        type={ type }
                                        changeStatus={ changeStatus }/>
                                :   <span className="center-align card-title">Книги все книги возвращены</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
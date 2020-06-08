import React from 'react';
import { Plate } from '../components/Plate';

export function UserCard({ user, books }) {

    return (
        <div className="row">
            <div className="col s12" style={{ marginTop: "1rem" }}>
                <div className="card white">
                    <div className="card-content black-text">
                        <div>
                            <span className="card-title">Мои профиль: </span>
                        </div>
                        <div style={{ marginLeft: "1rem" }}>
                            <span>Имя пользователя</span>
                            <span className="card-title">{ user.name }</span><br/>
                        </div>
                        <div style={{ marginLeft: "1rem" }}>
                            <span>Email пользователя</span>
                            <span className="card-title">{ user.email }</span>
                        </div>
                        <div style={{ marginTop: "4rem" }}>
                            <span className="card-title">Мои книги :</span>
                        </div>
                        <Plate books={ books }/>
                    </div>
              </div>
            </div>
        </div>
    );
};
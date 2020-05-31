import React from 'react';

export function UserCard({ user }) {

    return (
        <div className="row">
            <div className="col s12" style={{ marginTop: "1rem" }}>
                <div className="card white">
                    <div className="card-content black-text">
                        <div>
                            <span>Имя пользователя</span>
                            <span className="card-title">{ user.name }</span><br/>
                        </div>
                        <div>
                            <span>Email пользователя</span>
                            <span className="card-title">{ user.email }</span>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    );
};
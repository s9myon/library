import React, { Fragment } from 'react';
import { InstancePlate } from './InstancePlate';

export function BookCard({ instances, addWishHandler, isAuth, type }) {
    return (
        <Fragment>
            <div className="row">
                <div className="col s12" style={{ marginTop: "1rem" }}>
                    <div className="card white">
                        <div className="card-content black-text">
                            <span className="card-title">{ instances[0].title }</span>
                            <p>{ instances[0].surname + " " + instances[0].name + " " + instances[0].middleName }</p>
                            <br/>
                            <span className="card-title">Список изданий: </span>
                        </div>
                        <InstancePlate
                            instances={ instances }
                            addWishHandler={ addWishHandler }
                            isAuth={ isAuth }
                            type={ type }/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
import React, { Fragment } from 'react';

export function BookCard({ book }) {
    return (
        <Fragment>
            <div className="row">
                <div className="col s12" style={{ paddingTop: "1rem" }}>
                    <div className="card white">
                        <div className="card-content black-text">
                            <span className="card-title">{ book.book }</span>
                            <p>{ book.author }</p>
                        </div>
                        <div className="card-action">
                            <a href="/">Написать рецензию</a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
import React from 'react';

export function Notes({ notes }) {
    return (
        <ul className="list-group">
            {notes.map(note => {
                return(<li
                    className="list-group-item note"
                    key={ note.id }
                    >
                        <div>
                            <strong>{ note.title }</strong>
                            <small>{new Date().toLocaleDateString()}</small>
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-info btn-sm">
                                &times;
                        </button>
                    </li>)
            })}
        </ul>
    );
}
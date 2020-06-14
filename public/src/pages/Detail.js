import React, { useState, useCallback, useEffect, Fragment, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { BookCard } from '../components/BookCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/auth.context';
import { useMessage } from '../hooks/message.hook';

export function Detail() {
    const { request, loading, error, clearError } = useHttp();
    const [instances, setInstances] = useState(null);
    const { isAuth, type, token } = useContext(AuthContext);
    const message = useMessage();
    // берём параметр из get запроса
    const bookId = useParams().id;

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const getBook = useCallback(async () => {
        try {
            const result = await request(`/book/details/${bookId}`, 'GET', null);
            setInstances(result.data);
        } catch(e) {

        }
    }, [bookId, request]);

    async function addWishHandler(event) {
        try {
            await request(`/book/wish/addwish`, 'POST', { instance: { id: event.target.id }, token });
        } catch(e) {

        }
    }

    useEffect(() => {
        getBook();
    }, [getBook]);

    if(loading) {
        return <Loader />
    }

    return(
        <Fragment>
            { !loading && instances &&
            <BookCard
                instances={ instances }
                addWishHandler={ addWishHandler }
                isAuth={ isAuth }
                type={ type }
                />
            }
        </Fragment>
    );
};
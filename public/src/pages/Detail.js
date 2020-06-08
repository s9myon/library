import React, { useState, useCallback, useEffect, Fragment, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { BookCard } from '../components/BookCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/auth.context';
import { useMessage } from '../hooks/message.hook';

export function Detail() {
    const { request, loading, error, clearError } = useHttp();
    const [book, setBook] = useState(null);
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
            setBook(result.data);
        } catch(e) {

        }
    }, [bookId, request]);

    async function addWishHandler(event) {
        console.log(event.target.id);
        try {

            const result = await request(`/book/wish/addwish`, 'POST', { book: book.book, token });
            console.log(result);
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
            { !loading && book &&
            <BookCard
                book={ book }
                addWishHandler={ addWishHandler }
                isAuth={ isAuth }
                type={ type }
                />}
        </Fragment>
    );
};
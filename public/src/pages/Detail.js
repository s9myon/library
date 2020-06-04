import React, { useState, useCallback, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { BookCard } from '../components/BookCard';
import { Loader } from '../components/Loader';

export function Detail() {
    const { request, loading } = useHttp();
    const [book, setBook] = useState(null);
    // берём параметр из get запроса
    const bookId = useParams().id;

    const getBook = useCallback(async () => {
        try {
            const result = await request(`/book/details/${bookId}`, 'GET', null);
            console.log(result.data);
            setBook(result.data);
        } catch(e) {

        }
    }, [bookId, request]);


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
                />}
        </Fragment>
    );
};
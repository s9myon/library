import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { Search } from '../components/Search';
import { Plate } from '../components/Plate';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { useHttp } from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';

export function Library() {
    const { request, loading } = useHttp();
    const [data, setData] = useState(null);
    const history = useHistory();
    // количество записей на странице
    let limit = 10;
    let offset = 0;

    const getLibraryBooks = useCallback( async () => {
        try {
            const result = await request(`/book/library/${limit}/${offset}`, 'GET', null);
            setData(result.data);
        } catch(e) {

        }
    }, [request, limit, offset]);

    function pressHandler(event) {
        console.log(event.target.id);
        history.push(`/detail/${event.target.id}`);
    }

    useEffect(() => {
        getLibraryBooks();
    }, [getLibraryBooks]);

    if (loading) {
        return <Loader />
    }

    return(
        <Fragment>
            <Search />
            <hr/>
            { !loading && data && <Plate books={ data.books } pressHandler={ pressHandler } />}
            { !loading && data && <Pagination />}
        </Fragment>
    );
}
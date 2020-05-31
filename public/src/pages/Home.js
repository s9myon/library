import React, { Fragment, useCallback, useContext, useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { Plate } from '../components/Plate';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';
import { UserCard } from '../components/UserCard';

export function Home() {
    const { request, loading } = useHttp();
    const [data, setData] = useState();
    const { token } = useContext(AuthContext);

    const getMyBooks = useCallback( async () => {
        try {
            const result = await request(`/book/profile/${ token }`, 'GET', null);
            setData(result.data);
        } catch(e) {

        }
    }, [token, request]);

    useEffect(() => {
        getMyBooks();
    }, [getMyBooks]);

    if (loading) {
        return <Loader />
    }

    return (
        <Fragment>
            { !loading && data && <UserCard user={ data.userInfo } />}
            <hr/>
            { !loading && data && <Plate books={ data.books }/>}
        </Fragment>
    );
}

import React, { useState, useCallback, useEffect, Fragment, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/auth.context';
import { useMessage } from '../hooks/message.hook';
import { UserInform } from '../components/UserInform';

export function UserDetail() {
    const { request, loading, error, clearError } = useHttp();
    const [data, setData] = useState(null);
    const { isAuth, type, token } = useContext(AuthContext);
    const message = useMessage();
    // берём параметр из get запроса
    const userId = useParams().id;

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const getBook = useCallback(async () => {
        try {
            const result = await request(`/user/admin/profile/${userId}/${token}`, 'GET', null);
            setData(result.data);
        } catch(e) {

        }
    }, [userId, token, request]);

    async function changeStatus(event) {
        try {
            let result = await request(`/book/admin/updateinstance`, 'POST',
                {
                    user: { id: userId },
                    instance: {
                        id: event.target.id,
                        holder: null,
                        dateTaken: null
                    },
                    token
                }
            );
            let newData = { user: data.user, books: result.data };
            setData(newData);
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
            { !loading && data &&
                <UserInform
                    user={data.user}
                    books={data.books}
                    isAuth={isAuth}
                    type={type}
                    changeStatus={changeStatus}/>}
        </Fragment>
    );
};
import React, { Fragment, useCallback, useState, useEffect, useContext } from 'react';
import { Loader } from '../components/Loader';
import { useHttp } from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { UserPlate } from '../components/UserPlate';
import { SearchUser } from '../components/SearchUser';

export function UsersList() {
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState(null);
    const history = useHistory();

    const getUsersList = useCallback( async () => {
        try {
            const result = await request(`/user/admin/userslist/${token}`, 'GET', null);
            setUsers(result.data);
        } catch(e) {

        }
    }, [request, token]);

    function pressHandler(event) {
        console.log(event.target.id);
        history.push(`/userdetail/${event.target.id}`);
    }

    useEffect(() => {
        getUsersList();
    }, [getUsersList]);

    if (loading) {
        return <Loader />
    }

    return(
        <Fragment>
            <SearchUser/>
            <hr/>
            { !loading && users && <UserPlate users={ users } pressHandler={ pressHandler }/>}
        </Fragment>
    );
}
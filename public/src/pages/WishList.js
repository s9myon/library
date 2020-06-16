import React, { Fragment, useCallback, useState, useEffect, useContext } from 'react';
import { WishPlate } from '../components/WishPlate';
import { Loader } from '../components/Loader';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';

export function WishList() {
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);
    const [wishes, setWishes] = useState(null);

    const getWishList = useCallback(async () => {
        try {
            const result = await request(`/book/wish/${token}`, 'GET', null);
            setWishes(result.data);
        } catch(e) {

        }
    }, [request, token]);

    const deleteWishHandler = useCallback(async(event) => {
        if(event.target.id) {
            const result = await request('/book/wish/delete', 'POST', { instance: { id: event.target.id }, token });
            setWishes(result.data);
        }
    }, [request, token]);

    useEffect(() => {
        getWishList();
    }, [getWishList]);

    if (loading) {
        return <Loader />
    }

    return(
        <Fragment>
            <div className="row">
                <div className="col s12">
                    <div className="card white">
                        <div className="card-content black-text">
                          <span className="card-title">Лист ожидания</span>
                          <p>
                            Здесь находятся книги, которые вы добавитли в лист ожидания.
                            Если издание книги будет доступно в библиотеке, то мы вам скажем об этом.
                          </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            { !loading && wishes && <WishPlate wishes={ wishes } pressHandler={ deleteWishHandler } />}
        </Fragment>
    );
}
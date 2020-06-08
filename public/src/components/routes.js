import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Auth } from '../pages/Auth';
import { Registr } from '../pages/Registr';
import { Detail } from '../pages/Detail';
import { Library } from '../pages/Library';
import { AdminPage } from '../pages/AdminPage';
import { WishList } from '../pages/WishList';

export function useRoutes(isAuth, type) {
    if (isAuth) {
        console.log(type);
        if (type === "admin") {
            return (
                <Switch>
                    <Route path={'/admin'}>
                        <AdminPage />
                    </Route>
                    <Route path={'/library'} exact>
                        <Library />
                    </Route>
                    <Route path={'/detail/:id'} exact>
                        <Detail />
                    </Route>
                    
                    <Redirect to={'/admin'} />
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Route path={'/home'} exact>
                        <Home />
                    </Route>
                    <Route path={'/library'} exact>
                        <Library />
                    </Route>
                    <Route path={'/detail/:id'} exact>
                        <Detail />
                    </Route>
                    <Route path={'/wishlist'}>
                        <WishList />
                    </Route>

                    <Redirect to={'/home'} />
                </Switch>
            )
        }
    } else {
        return (
            <Switch>
                <Route path={'/auth'} exact>
                    <Auth />
                </Route>
                <Route path={'/registr'} exact>
                    <Registr />
                </Route>
                <Route path={'/library'} exact>
                    <Library />
                </Route>
                <Route path={'/detail/:id'} exact>
                    <Detail />
                </Route>

                <Redirect to={'/auth'} />
            </Switch>
        )
    }
}
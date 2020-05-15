import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Auth } from '../pages/Auth';
import { Registr } from '../pages/Registr';

export function useRoutes(isAuth) {
    if (isAuth) {
        return (
            <Switch>
                <Route path={'/home'} exact>
                    <Home />
                </Route>
                <Route path={'/about'} exact>
                    <About />
                </Route>
                
                <Redirect to={'/home'} />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path={'/auth'} exact>
                    <Auth />
                </Route>
                <Route path={'/registr'}>
                    <Registr />
                </Route>
                <Redirect to={'/auth'} />
            </Switch>
        )
    }
}
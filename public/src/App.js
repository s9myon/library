import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useRoutes } from './components/routes';
import { Loader } from './components/Loader';
import { useAuth } from './hooks/auth.hook';
import 'materialize-css';
import { AuthContext } from './context/auth.context';

function App() {
    const { id, token, type, login, logout, ready } = useAuth();
    // !! - перевод в boolean
    const isAuth = !!token;
    const routes = useRoutes(isAuth, type);

    if(!ready) {
        return (<Loader />);
    }
    return (
        <AuthContext.Provider value={{
            id, token, type, login, logout, isAuth, ready
        }}>
            <BrowserRouter>
                { isAuth && <Navbar /> }
                <div className="container">
                    <Switch>
                        { routes }
                    </Switch>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
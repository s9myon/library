import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useRoutes } from './components/routes';
import { useAuth } from './hooks/auth.hook';
import 'materialize-css';
import { AuthContext } from './context/auth.context';

function App() {
    const { id, token, login, logout } = useAuth();
    // !! - перевод в boolean
    const isAuth = !!token;
    const routes = useRoutes(isAuth);
    return (
        <AuthContext.Provider value={{
            id, token, login, logout, isAuth
        }}>
            <BrowserRouter>
                { isAuth && <Navbar /> }
                <div>
                    <Switch>
                        {routes}
                    </Switch>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;


    // constructor(props) {
    //     super(props);
    //     this.server = new Server();
    //     this.state = {
    //         isAuth: false,
    //         isRegistr: false
    //     }
    // }

    // setAuth(val) {
    //     if (!val) {
    //         this.server.logout();
    //     }
    //     this.setState({isAuth: val});
    // }

    // setRegistr(val) {
    //     this.setState({isAuth: val});
    // }
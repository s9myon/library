import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useRoutes } from './components/routes';

function App() {
    const routes = useRoutes(false);

    return (
           <BrowserRouter>
                <Navbar />
                <div>
                        <Switch>
                            {routes}
                        </Switch>
                </div>
            </BrowserRouter>
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
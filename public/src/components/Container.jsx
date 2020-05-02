import React from 'react';
import MainScreen from './MainScreen';
import Registr from './Registr';
import Auth from './Auth';
import Server from '../Server';

class Container extends React.Component {
    constructor() {
        super();
        this.server = new Server();
        this.books = [
            { id: 1, name: 'Dune', author: 'Frank Herbert', completed: false },
            { id: 2, name: 'The Master and Margarita', author: 'Mikhail Bulgakov', completed: false },
            { id: 3, name: 'Martin Iden', author: 'Jack London', completed: false }
        ];
        this.state = {
            auth: false,
            registr: false,
            books: this.books
        }
        // эта привязка объязательна для доступа к 'this' в коллбэке
        this.onToggle = this.onToggle.bind(this);
    }

    setAuthState(val) {
        this.setState({
            auth: val
        })
    }

    setRegistrState(val) {
        this.setState({
            registr: val
        })
    }

    onToggle(id) {
        this.books.map(book => {
            if (book.id === id) {
                book.completed = !book.completed;
            }
            return book;
        });
        this.setState({books: this.books});
    }

    render() {
        return(
            <div className="App">{
                this.state.registr ? <Registr /> :
                    this.state.auth ? <Auth /> : 
                        <MainScreen
                            books = { this.books }
                            onToggle = { this.onToggle }/>
                }
            </div>
        );
    }
}

export default Container;
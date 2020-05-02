import React from 'react';
import md5 from 'md5';
import './Auth.css'

class Auth extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="menu">
                <div className='auth'>
                    <h1 className="header">Авторизация</h1>
                    <div className='menu__input'>
                        <input className='input__login' type='text' id='login' placeholder='email'></input><br />
                        <input className='input__password' type='password' id='password' placeholder='пароль'></input><br />
                        <div className='menu__btn'>
                            <div className='green__btn' onClick={/*() => this.login()*/console.log()} alt="green">
                            <label id='button'>Войти</label>
                            </div>
                            <div className='blue__btn' onClick={/*() => this.registration()*/console.log()}>
                            <label id='button'>Зарегестрироваться</label>
                            </div>
                        </div>                   
                    </div>   
                </div>
            </div>
        );
    }
}

export default Auth;
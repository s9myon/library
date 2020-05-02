import React from 'react'
import md5 from 'md5'
import './Registr.css'

class Registr extends React.Component {
    constructor(props) {
        super();
    }


    render(){
        return(
            <div className="menu">
                <div className='registr'>
                <h1>Регистрация </h1>
                    <div className='menu__input'>
                        <input className='input__login' type='text' id='login_Registr' placeholder='email'></input><br />
                        <input className='input__password' type='password' id='password_Registr' placeholder='пароль'></input><br />
                        <input className='input__password' type='password' id='password_Repit' placeholder='подтвердите пароль'></input><br />
                        <div className='menu__btn'>
                            <div className='green__btn' onClick={/*() => this.registration()*/ console.log()}>
                                <label id='button'>Подтвердить</label>
                            </div>
                            <div className='blue__btn' onClick={/*() => this.logout()*/ console.log()}>
                                <label id='button'>Отменить</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registr;

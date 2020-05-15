const md5 = require('md5');
const BaseManager = require('../BaseManager');
const User = require('./User');

class UserManager extends BaseManager {
    constructor(options) {
        super(options);
        // текущие пользователи
        this.users = {};
        // триггеры
        this.mediator.set(this.TRIGGERS.GET_USER_BY_TOKEN, token => this.getUserByToken(token));
        this.mediator.set(this.TRIGGERS.GET_USER_BY_ID, id => this.getUserById(id));
        // логика
        this.mediator.set(this.TRIGGERS.USER_LOGIN, data => this.userLogin(data));
        this.mediator.set(this.TRIGGERS.USER_LOGOUT, data => this.userLogout(data));
        this.mediator.set(this.TRIGGERS.USER_REGISTRATION, data => this.userRegistration(data)); 
        // события
        this.mediator.subscribe(this.EVENTS.LOGOUT, async data => await this.disconnect(data));
    }

    // EVENTS
    async disconnect(data) {
        let user = this.getUserByToken(data);
        if (user) {
            // обнулить токен
            await this.db.setToken(null, user.email);
            // удалить пользователя из списка
            delete this.users[user.id];
        }
    }
    // TRIGGERS

    getUserByToken(data = {}) {
        if (data.token) {
            for (let id in this.users) {
                if (this.users[id].token === data.token) {
                    return this.users[id];
                }
            }
        }
        return null;
    }

    getUserById(id) {
        if (id) {
            for (let key in this.users) {
                if (this.users[key].id === id) {
                    return this.users[key];
                }
            }
        }
        return null;
    }

    // LOGIC

    async userLogout(data = {}) {
        // вызвать все подписанные события
        this.mediator.call(this.EVENTS.LOGOUT, data);
        return true;
    }

    async userLogin(data = {}) {
        const { email, hash, random } = data;

        let user;
        
        if (email && hash && random) {
            user = await this.db.getUserByEmail(email);
            if(user) {
                let hashS = md5(user.password + random);
                if(hash === hashS) {
                    let rnd = Math.random();
                    let token = md5(email + rnd);
                    await this.db.setToken(token, email);
                    user.token = token;
                    this.users[user.id] = new User(user);

                    return true;
                }
            }
        }
        return false;
    }

    async userRegistration(data = {}) {
        const { email, hash, name } = data;
        if (email && hash && name) {
            if (await this.db.getUserByEmail(name)) {
                // если уже существует такой пользователь
                return false;
            } else {
                // если ещё нет такого пользователя
                await this.db.addUser(email, hash, name);
                return true;
            }
        }
        return false;
    }
    
}

module.exports = UserManager;
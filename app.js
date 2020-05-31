const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

// конфигурация
const CONFIG = require('./config');
const { PORT, DATABASE, TRIGGERS, EVENTS } = CONFIG;

// классы модулей
const Mediator = require('./application/modules/Mediator');
const DB = require('./application/modules/db/DB');
const UserManager = require('./application/modules/userManager/UserManager');
const BookManager = require('./application/modules/bookManager/BookManager');

// подключаем модули
const mediator = new Mediator({ TRIGGERS, EVENTS });
const db = new DB(DATABASE);

new UserManager({ mediator, db });
new BookManager({ mediator, db });

//  подключаем роутеры
const Router = require('./application/router/Router');
const router = new Router({ mediator });
app.use(express.json({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/', router);


function deinitModules() {
	db.destructor();
	setTimeout(() => process.exit(), 500);
}


async function start() {
    try {

        server.listen(PORT, () => console.log(`Port is ${PORT}`));
        
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
process.on('SIGINT', deinitModules);
// классы модулей
// const DB = require('./application/modules/db/DB'); // базонька с данными

// подключение модулей
// const db = new DB(DATABASE);

// получаем роутер
// const Router = require('./application/router/Router');
// const router = new Router();
// // указываем директорию со статическими файлами
// app.use(express.static(__dirname + '/public'));
// app.use("/", router);


// function deinitModules() {
// 	db.destructor();
// 	setTimeout(() => process.exit(), 500);
// }

// слушаем порт
//server.listen(9000, () => console.log(`Port is ${PORT}`));
// выключаем базу данных
// process.on('SIGINT', deinitModules);
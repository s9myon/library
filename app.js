const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

// конфигурация
const config = require('config');
const PORT = config.get('PORT');
const DATABASE = config.get('DATEBASE');
const TRIGGERS = config.get('TRIGGERS');
const EVENTS = config.get('EVENTS');

// классы модулей
const Mediator = require('./application/modules/Mediator');
const DB = require('./application/modules/db/DB');

// подключаем модули
const mediator = new Mediator({ TRIGGERS, EVENTS });
const db = new DB(DATABASE);
const UserManager = require('./application/modules/userManager/UserManager');

new UserManager({ mediator, db });

//  подключаем роутеры
const Router = require('./application/router/Router');
const router = new Router({ mediator, TRIGGERS });
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
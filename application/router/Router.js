const express = require('express');
const router = express.Router();


function Router({ mediator, TRIGGERS }) {

    router.get('/test', test);
    router.post('/login', login);
    router.post('/register', registration);

    
    function test(req, res) {
        res.send({ answer: 'Hello world' });
    }

    async function login(req, res) {
        try {

            const { email, hash, random } = req.body;

            let result = await mediator.get(TRIGGERS.USER_LOGIN, { email, hash, random });
        
            if (result) {
                res.status(200).json({
                    message: 'Вход выполнен'
                });
            } else {
                res.status(412).json({
                    message: 'Неверный пароль или email, попробуйте снова'
                })
            }
        } catch (e) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте снова'
            });
        }
    }

    async function registration(req, res) {
            try {
                console.log('Body', req.body);

                const { email, hash, name } = req.body;

                let result = await mediator.get(TRIGGERS.USER_REGISTRATION, { email, hash, name });
                
                if (result) {
                    res.status(201).json({
                        message: 'Пользователь создан'
                    });
                } else {
                    res.status(412).json({
                        message: 'Пользователь с таким email уже существует'
                    })
                }

            } catch (e) {
                res.status(500).json({
                    message: 'Что-то пошло не так, попробуйте снова'
                });
            }
    }

    return router;
}


module.exports = Router;
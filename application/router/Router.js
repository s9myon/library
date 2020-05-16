const express = require('express');
const router = express.Router();


function Router({ mediator, TRIGGERS }) {

    router.get('/test', test);
    router.post('/login', login);
    router.post('/logout', logout);
    router.post('/register', registration);
    router.all('/*', defaultHandler);

    // constructors
    const BaseRouter = require("./BaseRouter");
    // instance
    const baseRouter = new BaseRouter();

    // test
    function test(req, res) {
        res.send({ answer: 'Hello world' });
    }

    // login
    async function login(req, res) {
        try {
            const { email, hash, random } = req.body;

            let result = await mediator.get(TRIGGERS.USER_LOGIN, { email, hash, random });
            
            const { id, name, token } = result;
            
            if (result) {
                res.send(baseRouter.answer({ id, name, email, token }));
            } else {
                res.send(baseRouter.error(400));
            }
        } catch (e) {
            res.send(baseRouter.error(500));
        }
    }

    // logout
    async function logout(req, res) {
        try {
            const { token } = req.body;

            let result = await mediator.get(TRIGGERS.USER_LOGOUT, { token });

            if (result) {
                res.send(baseRouter.answer(result));
            }
        } catch (e) {
            res.send(baseRouter.error(500));
        }
    }

    // register
    async function registration(req, res) {
        try {
            const { email, hash, name } = req.body;

            let result = await mediator.get(TRIGGERS.USER_REGISTRATION, { email, hash, name });
            
            if (result) {
                res.send(baseRouter.answer(result));
            } else {
                res.send(baseRouter.error(400));
            }
        } catch (e) {
            res.send(baseRouter.error(500));
        }
    }

    function defaultHandler(req, res) {
        res.send(baseRouter.error(404));
    }

    return router;
}


module.exports = Router;
const express = require('express');
const router = express.Router();

function Router() {
    router.get('/power', answerHandler);
    router.all('/*', defaultHandler);

    //constructors
    const BaseRouter = require('./BaseRouter');
    //exemplars
    const baseRouter = new BaseRouter();

    function answerHandler() {
        
    }

    function defaultHandler(req, res) {
        res.send(baseRouter.error(404));
    }
}

module.exports = Router;
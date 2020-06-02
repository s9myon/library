const express = require('express');
const router = express.Router();


function Router({ mediator }) {

    const TRIGGERS = mediator.getTriggers();

    router.post('/user/login', login);
    router.post('/user/logout', logout);
    router.post('/user/register', registration);
    router.get('/book/profile/:token', getMyProfile);
    router.get('/book/library/:limit/:offset', getLibraryBooks);
    router.get('/book/details/:id', getBookDetails);
    router.post('/book/admin/addbook', addNewBook);

    router.all('/*', defaultHandler);

    // constructors
    const BaseRouter = require("./BaseRouter");
    // instance
    const baseRouter = new BaseRouter();
    
    async function addNewBook(req, res) {
        try {
            const { book, author, token } = req.body;
            const result = await mediator.get(TRIGGERS.ADD_NEW_BOOK, { book, author, token });
            if (result) {
                res.send(baseRouter.answer(result));
            } else {
                res.send(baseRouter.error(400));
            }
        } catch (e) {
            res.send(baseRouter.error(500));
        }
    }

    // получить детальное представление книги из библиотеки
    // (экземпляры, рецензии, ???)
    async function getBookDetails(req, res) {
        try {
            const id = req.params.id;
            let result = await mediator.get(TRIGGERS.GET_BOOK_DETAILS, id);
            if (result) {
                res.send(baseRouter.answer(result));
            } else {
                res.send(baseRouter.error(400));
            }
        } catch(e) {
            res.send(baseRouter.error(500));
        }
    }

    // получить список книг в библиотеке
    async function getLibraryBooks(req, res) {
        try {
            const { limit, offset } = req.params;
            let result = await mediator.get(TRIGGERS.GET_LIBRARY_BOOKS, { limit, offset });
            if (result) {
                res.send(baseRouter.answer(result));
            } else {
                res.send(baseRouter.error(400));
            }
        } catch(e) {
            res.send(baseRouter.error(500));
        }
    }

    async function getMyProfile(req, res) {
        try{
            const token = req.params.token;
            let result = await mediator.get(TRIGGERS.GET_MY_PROFILE, token);
            if(result) {
                res.send(baseRouter.answer(result));
            } else if (result === null){
                res.send(baseRouter.answer(result));
            } else if (result === false){
                res.send(baseRouter.error(400));
            }
        } catch(e) {
            res.send(baseRouter.error(500));
        }
    }
    

    // login
    async function login(req, res) {
        try {
            const { email, hash, random } = req.body;
            let result = await mediator.get(TRIGGERS.USER_LOGIN, { email, hash, random });
            if (result) {
                res.send(baseRouter.answer(result));
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
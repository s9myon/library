class BaseRouter {
    constructor() {
        this.ERROR = {
            404: 'page not found',
            
            9000: 'undefined error'
        }
    }

    answer(date) {
        return { result: 'ok', data };
    }

    error(code = 9000) {
        return {
            result: 'error',
            error: {code, text: this.ERROR[code]}
        }
    }
}

module.exports = BaseRouter;
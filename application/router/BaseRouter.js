module.exports = class BaseRouter {
    constructor() {
        this.ERROR = {
            400: 'bad request',
            404: 'page not found',
            500: 'unknown error'
        }
    }

    answer(data) {
        return {
            result: 'ok',
            data: data
        }
    }

    error(code = 9000) {
        return {
            result: 'error',
            error: {
                code,
                text: this.ERROR[code]
            }
        }
    }
}
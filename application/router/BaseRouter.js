module.exports = class BaseRouter {
    constructor() {
        this.ERROR = {
            400: 'bad request',
            404: 'page not found',
            500: 'unknown error',
            501: 'Возможно этот экземпляр уже у вас на руках или в вашем листе ожидания'
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
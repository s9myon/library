const CONFIG = {
    PORT: 9000,

    DATABASE: {
        HOST: "",
        NAME: "library.db",
        USER: "",
        PASS: ""
    },

    TRIGGERS: {
        // about users
        GET_USER_BY_TOKEN: "GET_USER_BY_TOKEN",
        GET_USER_BY_EMAIL: "GET_USER_BY_EMAIL",
        GET_USER_BY_ID: "GET_USER_BY_ID",
        USER_LOGIN: "USER_LOGIN",
        USER_LOGOUT: "USER_LOGOUT",
        USER_REGISTRATION: "USER_REGISTRATION",
        // about books
        GET_MY_PROFILE: "GET_MY_PROFILE",
        GET_BOOK_DETAILS: "GET_BOOK_DETAILS",
        GET_LIBRARY_BOOKS: "GET_LIBRARY_BOOKS"
    },

    EVENTS: {
        LOGOUT: "LOGOUT"
    }
}

module.exports = CONFIG;
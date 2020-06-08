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
        GET_LIBRARY_BOOKS: "GET_LIBRARY_BOOKS",
        GET_USER_WISH_LIST: "GET_USER_WISH_LIST",
        ADD_NEW_BOOK: "ADD_NEW_BOOK",
        ADD_NEW_WISH: "ADD_NEW_WISH",
        DELETE_WISH: "DELETE_WISH"
    },

    EVENTS: {
        LOGOUT: "LOGOUT"
    }
}

module.exports = CONFIG;
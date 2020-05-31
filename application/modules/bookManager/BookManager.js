const BaseManager = require('../BaseManager');

class BookManager extends BaseManager {
    constructor(options) {
        super(options);
        // триггеры
        this.mediator.set(this.TRIGGERS.GET_MY_PROFILE, token => this.getMyProfile(token));
        this.mediator.set(this.TRIGGERS.GET_BOOK_DETAILS, id => this.getBookDetails(id));
        this.mediator.set(this.TRIGGERS.GET_LIBRARY_BOOKS, data => this.getLibraryBooks(data));
    }

    async getMyProfile(token) {
        if (token) {
            let user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, { token });
            if (user) {
                let books = await this.db.getInstancesOfBooksByHolderEmail(user.email);
                if (books) {
                    let { name, email } = user;
                    return { userInfo: { name, email }, books };
                } else {
                    return null;
                }
            } 
        }
        return false;
    }
    // на вход идут книга.название, автор.имя, автор.фамилия, автор.отчество
    async addNewBook(data) {
        const { book, author } = data;
        if (book && author) {
            let author = await this.db.getAuthorBySurname(author);
            console.log();
            if (author) { // если автор существует
                
            } else { // если автора не существует
                await this.db.addAuthor(author.surname, author.name, author.middleName);
            }
        }
        return false;
    }

    async getBookDetails(id) {
        if (id) {
            let book = await this.db.getBookById(id);
            return book ? book : null;
        }
        return false;
    }

    async getLibraryBooks(data) {
        const { limit, offset } = data;
        if (limit && offset) {
            let countOfBooks = await this.db.getCountOfBooks();
            if (countOfBooks) {
                if (countOfBooks > offset) {
                    let books = await this.db.getBooksFromTo(limit, offset);
                    return { books, countOfBooks };
                } else {
                    return null;
                }
            }
        }
        return false;
    }
}

module.exports = BookManager;
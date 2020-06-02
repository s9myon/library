const BaseManager = require('../BaseManager');

class BookManager extends BaseManager {
    constructor(options) {
        super(options);
        // триггеры
        this.mediator.set(this.TRIGGERS.GET_MY_PROFILE, token => this.getMyProfile(token));
        this.mediator.set(this.TRIGGERS.GET_BOOK_DETAILS, id => this.getBookDetails(id));
        this.mediator.set(this.TRIGGERS.GET_LIBRARY_BOOKS, data => this.getLibraryBooks(data));
        this.mediator.set(this.TRIGGERS.ADD_NEW_BOOK, data => this.addNewBook(data));
    }

    // на вход идут книга.название, автор.имя, автор.фамилия, автор.отчество
    async addNewBook(data) {
        if(data.token) {
            let user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, data.token);
            if(user.type === "admin") {
                if (data.book && data.author) {
                    let author = await this.db.getAuthorByInitials(
                        data.author.surname,
                        data.author.name,
                        data.author.middleName
                    );
                    if (author) {
                        let booksOfAuthor = await this.db.getBooksByAuthorInitials(
                            author.surname,
                            author.name,
                            author.middleName
                        );
                        for(let i = 0; i < booksOfAuthor.length; i++) {
                            if (booksOfAuthor[i].title === data.book) { // если у автора уже существует такая книга
                                // добавляем экземпляр этой книги в бд
                                await this.db.addInstanceOfBook(booksOfAuthor[i].id);
                                return true;
                            } else { // если у автора ещё нет такой книги
                                await this.db.addBook(data.book, author.id);
                                // берём эту же книгу из бд(чтобы узнать её id в бд)
                                let newBook = await this.db.getBookByTitle(data.book);
                                await this.db.addInstanceOfBook(newBook.id);
                                return true;
                            }
                        };
                    } else { // если автора не существует в бд
                        await this.db.addAuthor(data.author.surname, data.author.name, data.author.middleName);
                        // берём этого же автора из бд(чтобы узнать его id в бд)
                        let newAuthor = await this.db.getAuthorByInitials(
                            data.author.surname,
                            data.author.name,
                            data.author.middleName
                        );
                        await this.db.addBook(data.book, newAuthor.id);
                        // берём эту же книгу из бд(чтобы узнать её id в бд)
                        let newBook = await this.db.getBookByTitle(data.book);
                        await this.db.addInstanceOfBook(newBook.id);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    async getMyProfile(token) {
        if (token) {
            let user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, token);
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
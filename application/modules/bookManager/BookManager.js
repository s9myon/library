const BaseManager = require('../BaseManager');

class BookManager extends BaseManager {
    constructor(options) {
        super(options);
        // триггеры
        this.mediator.set(this.TRIGGERS.GET_MY_PROFILE, token => this.getMyProfile(token));
        this.mediator.set(this.TRIGGERS.GET_USER_PROFILE, data => this.getUserProfile(data));
        this.mediator.set(this.TRIGGERS.GET_BOOK_DETAILS, id => this.getBookDetails(id));
        this.mediator.set(this.TRIGGERS.GET_LIBRARY_BOOKS, data => this.getLibraryBooks(data));
        this.mediator.set(this.TRIGGERS.UPDATE_BOOK_INSTANCE, data => this.updateBookInstanceStatus(data));
        this.mediator.set(this.TRIGGERS.GET_USER_WISH_LIST, token => this.getUserWishList(token));
        this.mediator.set(this.TRIGGERS.GET_USERS_LIST, token => this.getUsersList(token));
        this.mediator.set(this.TRIGGERS.ADD_NEW_BOOK, data => this.addNewBook(data));
        this.mediator.set(this.TRIGGERS.ADD_NEW_WISH, data => this.addNewWish(data));
        this.mediator.set(this.TRIGGERS.DELETE_WISH, data => this.deleteWish(data));
    }

    // на вход идут книга.название, автор.имя, автор.фамилия, автор.отчество
    async addNewBook(data) {
        if(data.token) {
            let user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, data.token);
            if(user.type === "admin") {
                if (data.book && data.author && data.publishingHouse && data.yearOfIssue) {
                    let author = await this.db.getAuthorByInitials(
                        data.author.surname,
                        data.author.name,
                        data.author.middleName
                    );
                    let publishingHouse = await this.db.getPublishingHouseByTitle(
                        data.publishingHouse
                    );
                    if (author && publishingHouse) { // если автор и издательство есть в бд
                        let booksOfAuthor = await this.db.getBooksByAuthorInitials(
                            author.surname,
                            author.name,
                            author.middleName
                        );
                        // если у автора уже существует такая книга
                        for(let i = 0; i < booksOfAuthor.length; i++) {
                            if (booksOfAuthor[i].title === data.book) { 
                                await this.db.addInstanceOfBook(booksOfAuthor[i].id, data.yearOfIssue, publishingHouse.id);
                                return true;
                            }
                        };
                        // если у автора ещё нет такой книги
                        await this.db.addBook(data.book, author.id);
                        let newBook = await this.db.getBookByTitle(data.book);
                        await this.db.addInstanceOfBook(newBook.id, data.yearOfIssue, publishingHouse.id);
                        return true;
                    } else if (author){ // если издательства нет в бд
                        // добавляем и получаем это же издательство из бд
                        await this.db.addPublishingHouse(data.publishingHouse);
                        let newPublishingHouse = await this.db.getPublishingHouseByTitle(
                            data.publishingHouse
                        );
                        let booksOfAuthor = await this.db.getBooksByAuthorInitials(
                            author.surname,
                            author.name,
                            author.middleName
                        );

                        // если у автора уже существует такая книга
                        // тогда добавляем экземпляр этой книги
                        for(let i = 0; i < booksOfAuthor.length; i++) {
                            if (booksOfAuthor[i].title === data.book) {
                                await this.db.addInstanceOfBook(booksOfAuthor[i].id, data.yearOfIssue, newPublishingHouse.id);
                                return true;
                            }
                        };

                        // если у автора ещё нет такой книги
                        // добаляем книгу и получаем её из бд 
                        await this.db.addBook(data.book, author.id);
                        let newBook = await this.db.getBookByTitle(data.book);

                        // добавляем экземпляр этой книги
                        await this.db.addInstanceOfBook(newBook.id, data.yearOfIssue, newPublishingHouse.id);
                        return true;
                    } else if (publishingHouse) { // если автора нет в бд
                        
                        // добавляем и получаем автора из бд
                        await this.db.addAuthor(data.author.surname, data.author.name, data.author.middleName);
                        let newAuthor = await this.db.getAuthorByInitials(
                            data.author.surname,
                            data.author.name,
                            data.author.middleName
                        );

                        // добавляем и получаем книгу из бд
                        await this.db.addBook(data.book, newAuthor.id);
                        let newBook = await this.db.getBookByTitle(data.book);
                        
                        // добавляем экземпляр книги в бд
                        await this.db.addInstanceOfBook(newBook.id, data.yearOfIssue, publishingHouse.id);
                        return true;
                    } else { // если издательства и автора нет в бд

                        // добавляем и получаем автора и издательство из бд
                        await this.db.addAuthor(data.author.surname, data.author.name, data.author.middleName);
                        await this.db.addPublishingHouse(data.publishingHouse);

                        // берём этого же автора и издательство из бд(чтобы узнать их id в бд)
                        let newAuthor = await this.db.getAuthorByInitials(
                            data.author.surname,
                            data.author.name,
                            data.author.middleName
                        );
                        let newPublishingHouse = await this.db.getPublishingHouseByTitle(
                            data.publishingHouse
                        );

                        // добавляем и получаем книгу из бд
                        await this.db.addBook(data.book, newAuthor.id);
                        let newBook = await this.db.getBookByTitle(data.book);

                        // добавляем экземпляр этой книги из бд
                        await this.db.addInstanceOfBook(newBook.id, data.yearOfIssue, newPublishingHouse.id);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    async updateBookInstanceStatus(data) {
        if(data.token) {
            let user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, data.token);
            if(user.type === "admin") {
                if (data.instance.id && data.user.email) {
                    // если пользователь берёт книгу
                    let reader = await this.db.getUserByEmail(data.user.email);
                    let dateNow = new Date().toLocaleDateString();
                    await this.db.setHolderAndDateTakenOfInstanceByInstanceId(
                        data.instance.id,
                        reader.id,
                        dateNow
                    );
                    return true;
                } else if (data.instance.id && !data.instance.holder && !data.instance.dateTaken && data.user.id) {
                    // если пользователь вовращает книгу в библиотеку
                    await this.db.setHolderAndDateTakenOfInstanceByInstanceId(
                        data.instance.id,
                        data.instance.holder,
                        data.instance.dateTaken
                    );
                    // отправляем пользователям уведомление на почту о том что
                    // книга из их листа ожидания вернулась в библиотеку
                    let usersEmailWhoHaveThisInstanceInWish =
                        await this.db.getUserEmailByHisWishInstanceId(data.instance.id);
                    console.log("Экземпляр", data.instance.id)
                    console.log("Пользователи которые имеют эту книгу в списке желаний", usersEmailWhoHaveThisInstanceInWish);
                    if (Array.isArray(usersEmailWhoHaveThisInstanceInWish)) {
                        console.log(usersEmailWhoHaveThisInstanceInWish);
                        let recievers = null;
                        let promises = usersEmailWhoHaveThisInstanceInWish.map(user => {
                            if (recievers === null) {
                                recievers = user.email;
                            } else {
                                recievers += ", " + user.email;
                            }
                        });
                        await Promise.all(promises);
                        console.log("Получатели: ", recievers)
                        this.mediator.get(this.TRIGGERS.SEND_EMAIL, {
                            reciever: recievers,
                            subject: "Библиотека Онлайн",
                            text: "Книга из вашего листа ожидания появилась в библиотеке"
                        });
                    } else {
                        console.log("Получатель: ", usersEmailWhoHaveThisInstanceInWish.email);
                        this.mediator.get(this.TRIGGERS.SEND_EMAIL, {
                            reciever: usersEmailWhoHaveThisInstanceInWish.email,
                            subject: "Библиотека Онлайн",
                            text: "Книга из вашего листа ожидания появилась в библиотеке"
                        });
                    }
                    let reader = await this.db.getUserById(data.user.id);
                    let books = await this.db.getInstancesOfBooksByHolderEmail(reader.email);
                    return books ? books : null;
                }
            }
        }
        return false;
    }

    async getUsersList(token) {
        if(token) {
            let user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, token);
            if(user.type === "admin") {
                let userType = 'user';
                let users = await this.db.getUsersByUserType(userType);
                return users ? users : null;
            }
        }
        return false;
    }

    async addNewWish(data) {
        if(data.token) {
            let user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, data.token);
            if (user) {
                let wishes = await this.db.getWishListByUserId(user.id);
                let books =  await this.db.getInstancesOfBooksByHolderEmail(user.email);
                let instance = await this.db.getInstanceOfBookById(data.instance.id);
                if (wishes && books && instance) {
                    let hitСounter = 0;
                    for (let i = 0; i < wishes.length; i++) {
                        if (wishes[i].id === instance.id) {
                            hitСounter++;
                        }
                    }
                    for (let i = 0; i < books.length; i++) {
                        if (books[i].id === instance.id) {
                            hitСounter++;
                        }
                    }
                    if (hitСounter === 0) {
                        await this.db.addWish(user.id, instance.id);
                        return true;
                    }
                    
                }
            }
        }
        return false;
    }

    async deleteWish(data) {
        if (data.token) {
            let user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, data.token);
            if(user) {
                await this.db.deleteWishByUserIdAndInstanceId(user.id, data.instance.id);
                let wishList = await this.db.getWishListByUserId(user.id);
                return wishList ? wishList : null;
            }
        }
        return false;
    }

    async getUserWishList(token) {
        if (token) {
            let user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, token);
            if (user) {
                let wishList = await this.db.getWishListByUserId(user.id);
                return wishList ? wishList : null;
            }
        }
        return false;
    }

    async getUserProfile(data) {
        if(data.token) {
            let user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, data.token);
            if (user.type === "admin") {
                let reader = await this.db.getUserById(data.user.id);
                let books = await this.db.getInstancesOfBooksByHolderEmail(reader.email);
                if (reader && books) {
                    let { name, email } = reader;
                    return { user: { name, email }, books };
                } else {
                    return null;
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
            let instances = await this.db.getInstancesOfBookByBookTitle(book.book);
            return instances;
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
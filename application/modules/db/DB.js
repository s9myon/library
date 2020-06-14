const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { resolve } = require('path');

class DB {
    constructor({ NAME }) {
        this.db = new sqlite3.Database(path.join(__dirname, NAME));
    }

    destructor() {
        if (this.db) this.db.close();
    }

    // GET
    getUserByName(name) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = "SELECT * FROM user WHERE name=?";
            this.db.get(query, [name], (err, row) => resolve(err ? null : row));
        }));
    }

    getUserByEmail(email) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT user.id, user.name, user.email,
            user.password, typeOfUser.type, user.token
            FROM user INNER JOIN typeOfUser
            ON user.type = typeOfUser.id
            WHERE email=?;`;
            this.db.get(query, [email], (err, row) => resolve(err ? null : row));
        }));
    }

    getUserByToken(token) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = "SELECT * FROM user WHERE token=?";
            this.db.get(query, [token], (err, row) => resolve(err ? null : row));
        }));
    }

    getUserById(id) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT user.name, user.email
            FROM user
            WHERE user.id=?`;
            this.db.get(query, [id], (err, row) => resolve(err ? null : row));
        }));
    }

    getCountOfBooks() {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT COUNT(*) AS count FROM book`;
            this.db.get(query, (err, row) => resolve(err ? null : row));
        }));
    }

    getBookById(id) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT book.id, book.title AS book, author.surname,
            author.name, author.middleName
            FROM book INNER JOIN author ON
            book.author = author.id WHERE book.id = ?`;
            this.db.get(query, [id], (err, row) => resolve(err ? null : row));
        }));
    }



    getBookByTitle(title) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT book.id, book.title, author.surname,
            author.name, author.middleName FROM book
            INNER JOIN author
            ON book.author = author.id
            WHERE book.title = ?`;
            this.db.get(query, [title], (err, row) => resolve(err ? null : row));
        }));
    }

    getBooksByAuthorInitials(surname, name, middleName) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT book.id, book.title, author.surname,
            author.name, author.middleName FROM book
            INNER JOIN author
            ON book.author = author.id
            WHERE author.surname=?
            AND author.name=?
            AND author.middleName=?`;
            this.db.all(query, [surname, name, middleName], (err, row) => resolve(err ? null : row));
        }));
    }

    getBooksFromTo(limit, offset) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT book.id, book.title AS book, author.surname, author.name, author.middleName
            FROM book INNER JOIN author ON book.author = author.id LIMIT ? OFFSET ?`;
            this.db.all(query, [limit, offset], (err, row) => resolve(err ? null : row));
        }));
    }

    getInstanceOfBookById(instanceId) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT instance.id, book.title, publishingHouse.title AS publishingHouse,
            instance.yearOfIssue, user.name, instance.dateTaken
            FROM instance
            INNER JOIN book
            ON instance.book = book.id
            INNER JOIN publishingHouse
            ON instance.publishingHouse = publishingHouse.id
            LEFT JOIN user
            ON instance.holder = user.id
            WHERE instance.id=?`;
            this.db.get(query, [instanceId], (err, row) => resolve(err ? null : row));
        }));
    }

    getInstancesOfBooksByHolderEmail(email) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT instance.id, book.title AS book,
            author.surname, author.name, author.middleName, instance.dateTaken
            FROM instance INNER JOIN book
            ON instance.book=book.id
            INNER JOIN author
            ON book.author=author.id
            INNER JOIN user
            ON instance.holder=user.id
            WHERE user.email=?`;
            this.db.all(query, [email], (err, row) => resolve(err ? null : row));
        }));
    }

    getInstancesOfBookByBookTitle(book) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT instance.id, book.title, instance.yearOfIssue, publishingHouse.title AS publishingHouse,
            author.surname, author.name, author.middleName, user.name AS holder, instance.dateTaken
            FROM instance INNER JOIN book
            ON instance.book = book.id
            INNER JOIN author
            ON book.author = author.id
            INNER JOIN publishingHouse
            ON instance.publishingHouse = publishingHouse.id
            LEFT JOIN user
            ON instance.holder = user.id
            WHERE book.title = ?`;
            this.db.all(query, [book], (err, row) => resolve(err ? null : row));
        }));
    }

    getAuthorBySurname(surname) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = "SELECT * FROM author WHERE author.surname=?";
            this.db.get(query, [surname], (err, row) => resolve(err ? null : row));
        }));
    }

    getAuthorByInitials(surname, name, middleName) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT * FROM author
            WHERE author.surname=?
            AND author.name=?
            AND author.middleName=?`;
            this.db.get(query, [surname, name, middleName], (err, row) => resolve(err ? null : row));
        }));
    }

    getWishListByUserId(userId) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT instance.id, user.name, book.title,
            author.surname, author.name, author.middleName, instance.dateTaken
            FROM wishList
            INNER JOIN user
            ON wishList.user = user.id
            INNER JOIN instance
            ON book.id = instance.book
			INNER JOIN book
            ON wishList.book = instance.id
            INNER JOIN author
            ON book.author = author.id
            WHERE user.id = ?`;
            this.db.all(query, [userId], (err, row) => resolve(err ? null : row));
        }));
    }
    
    getPublishingHouseByTitle(title) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = 'SELECT * FROM publishingHouse WHERE publishingHouse.title=?';
            this.db.get(query, [title], (err, row) => resolve(err ? null : row));
        }));
    }

    getUsersByUserType(userType) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = `SELECT user.id, user.name, user.email
            FROM user
            INNER JOIN typeOfUser
            ON user.type = typeOfUser.id
            WHERE typeOfUser.type=?`;
            this.db.all(query, [userType], (err, row) => resolve(err ? null : row));
        }));
    }

    // ADD
    addWish(user, instance) {
        const query = 'INSERT INTO wishList (user, book) VALUES (?, ?)';
        this.db.run(query, [user, instance]);
    }

    addPublishingHouse(publishingHouse) {
        const query = 'INSERT INTO publishingHouse (title) VALUES (?)';
        this.db.run(query, [publishingHouse]);
    }

    addUser(email, password, name) {
        const query = "INSERT INTO user (email, password, name) VALUES (?, ?, ?)";
        this.db.run(query, [email, password, name]);
    }

    addBook(book, authorId) {
        const query = "INSERT INTO book (title, author) VALUES (?, ?)";
        this.db.run(query, [book, authorId]);
    }

    addInstanceOfBook(bookId, yearOfIssue, publishingHouseId) {
        const query = "INSERT INTO instance (book, yearOfIssue, publishingHouse) VALUES (?, ?, ?)";
        this.db.run(query, [bookId, yearOfIssue, publishingHouseId]);
    }

    addAuthor(surname, name, middleName) {
        const query = "INSERT INTO author (surname, name, middleName) VALUES (?, ?, ?)";
        this.db.run(query, [surname, name, middleName]);
    }
    
    // UPDATE
    setToken(token, email) {
        const query = "UPDATE user SET token=? WHERE email=?";
        this.db.run(query, [token, email]);
    }

    setHolderAndDateTakenOfInstanceByInstanceId(id, holder, dateTaken) {
        const query = `UPDATE instance
        SET holder=?, dateTaken=?
        WHERE id=?`;
        this.db.run(query, [holder, dateTaken, id]);
    }
    
    // DELETE
    deleteWishByUserIdAndInstanceId(userId, instanceId) {
        const query = `DELETE FROM wishList
        WHERE wishList.user = ? AND wishList.book = ?`;
        this.db.run(query, [userId, instanceId]);
    }
}

module.exports = DB;

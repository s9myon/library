const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DB {
    constructor({ NAME }) {
        this.db = new sqlite3.Database(path.join(__dirname, NAME));
    }

    destructor() {
        if (this.db) this.db.close();
    }

    getUserByName(name) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = "SELECT * FROM users WHERE name=?";
            this.db.get(query, [name], (err, row) => resolve(err ? null : row));
        }));
    }

    getUserByEmail(email) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = "SELECT * FROM users WHERE email=?";
            this.db.get(query, [email], (err, row) => resolve(err ? null : row));
        }));
    }

    getUserByToken(token) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = "SELECT * FROM users WHERE token=?";
            this.db.get(query, [token], (err, row) => resolve(err ? null : row));
        }));
    }

    addUser(email, password, name) {
        const query = "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";
        this.db.run(query, [email, password, name]);
    }

    setToken(token, email) {
        const query = "UPDATE users SET token=? WHERE email=?";
        this.db.run(query, [token, email]);
    }
}

module.exports = DB;

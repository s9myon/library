module.exports = class User {
    constructor({ id, name, email, type, token }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.type = type
        this.token = token;
    }
}
module.exports = class User {
    constructor({ id, name, email, type, token }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.typeOfUser = type
        this.token = token;
    }
}
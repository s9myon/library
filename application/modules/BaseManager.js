module.exports = class BaseManager {
    constructor({ mediator, db, EMAIL, PASSWORD }) {
        this.db = db;
        this.mediator = mediator;
        this.EMAIL = EMAIL;
        this.PASSWORD = PASSWORD;
        this.TRIGGERS = mediator.getTriggers();
        this.EVENTS = mediator.getEvents();
    }
}
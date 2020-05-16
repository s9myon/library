module.exports = class BaseManager {
    constructor({ mediator, db, MESSAGES }) {
        this.db = db;
        this.mediator = mediator;
        this.MESSAGES = MESSAGES;
        this.TRIGGERS = mediator.getTriggers();
        this.EVENTS = mediator.getEvents();
    }
}
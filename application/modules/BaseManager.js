module.exports = class BaseManager {
    constructor({ mediator, db }) {
        this.db = db;
        this.mediator = mediator;
        this.TRIGGERS = mediator.getTriggers();
        this.EVENTS = mediator.getEvents();
    }
}
import Router from 'koa-router';
import dataStore from 'nedb-promise';

export class EmailStore {
    constructor({ filename, autoload }) {
        this.store = dataStore({ filename, autoload });
    }

    async find(props) {
        return this.store.find(props || {});
    }

    async findOne(props) {
        return this.store.findOne(props);
    }
}

const emailStore = new EmailStore({ filename: 'db/emails.json', autoload: true });
console.log('EmailStore initialized with file:', emailStore.store);

export const emailRouter = new Router();

emailRouter.get('/', async (ctx) => {
    try {
        ctx.response.body = await emailStore.find();
        ctx.response.status = 200; // OK
    } catch (err) {
        console.error('Error fetching emails:', err);
        ctx.response.body = { error: 'Failed to fetch emails' };
        ctx.response.status = 500; // Internal Server Error
    }
});

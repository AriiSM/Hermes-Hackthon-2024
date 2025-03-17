import Router from 'koa-router';
import dataStore from 'nedb-promise';

export class ProfileStore {
    constructor({ filename, autoload }) {
        this.store = dataStore({ filename, autoload });
        console.log('ProfileStore initialized with file:', filename);
    }

    async find(props) {
        console.log('Finding profiles with props:', props);
        return this.store.find(props || {});
    }

    async findOne(props) {
        console.log('Finding one profile with props:', props);
        return this.store.findOne(props);
    }
}

const profileStore = new ProfileStore({ filename: 'db/profiles.json', autoload: true });
console.log('ProfileStore initialized with file:', profileStore.store);

export const profileRouter = new Router();

profileRouter.get('/', async (ctx) => {
    try {
        ctx.response.body = await profileStore.find();
        ctx.response.status = 200; // OK
    } catch (err) {
        console.error('Error fetching profiles:', err);
        ctx.response.body = { error: 'Failed to fetch profiles' };
        ctx.response.status = 500; // Internal Server Error
    }
});

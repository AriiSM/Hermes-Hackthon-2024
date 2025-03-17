import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import dataStore from "nedb-promise";
import { jwtConfig } from './utils.js';
import {broadcast} from "./wss.js";

export class UserStore {
    constructor({ filename, autoload }) {
        this.store = dataStore({ filename, autoload });
    }

    async findOne(props) {
        return this.store.findOne(props);
    }

    async insert(user) {
        return this.store.insert(user);
    };

    async update(props, user) {
        return this.store.update(props, user);
    }
}

const userStore = new UserStore({ filename: 'db/users.json', autoload: true });
console.log('userStore initialized with file:', userStore.store);

const createToken = (user) => {
    return jwt.sign({ username: user.username, _id: user._id }, jwtConfig.secret, { expiresIn: 60 * 60 * 60 });
};

export const userRouter = new Router();

userRouter.post('/signup', async (ctx) => {
    try {
        const user = ctx.request.body;
        await userStore.insert(user);
        ctx.response.body = { token: createToken(user) };
        ctx.response.status = 201; // created
    } catch (err) {
        ctx.response.body = { error: `${err.message} + test` };
        ctx.response.status = 400; // bad request
    }
});

userRouter.put('/:id', async (ctx) => {
    const user = ctx.request.body;
    const id = ctx.params.id;
    const userId = user._id;
    const response = ctx.response;
    if (userId && userId !== id) {
        response.body = { message: 'Param id and body _id should be the same' };
        response.status = 400; // bad request
        return;
    }
    if (!id) {
        // given id non-existent, create new user
        response.body = { message: 'Non-existent user with param id.' };
        response.status = 400; // bad request
    }
    else {
        const updatedCount = await userStore.update({ _id: id }, user);
        if (updatedCount === 1) {
            response.body = user;
            response.status = 200; // ok
            broadcast(userId, { type: 'updated', payload: user });
        } else {
            response.body = { message: 'Resource no longer exists' };
            response.status = 405; // method not allowed
        }
    }
})

userRouter.post('/login', async (ctx) => {
    const credentials = ctx.request.body;
    const user = await userStore.findOne({ username: credentials.username });
    if (user && credentials.password === user.password) {
        ctx.response.body = { token: createToken(user) };
        ctx.response.status = 201; // created
    } else {
        ctx.response.body = { error: 'Invalid credentials' };
        ctx.response.status = 400; // bad request
    }
});

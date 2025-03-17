import http from 'http';
import Koa from 'koa';
import WebSocket from 'ws';
import Router from 'koa-router';
import bodyParser from "koa-bodyparser";
import jwt from 'koa-jwt';
import cors from '@koa/cors';
import { jwtConfig, timingLogger, exceptionHandler } from './utils.js';
import { initWss } from './wss.js';
import { userRouter } from './users.js';
import {profileRouter} from "./profiles.js";
import {emailRouter} from "./emails.js";

const app = new Koa();
const server = http.createServer(app.callback());
const wss = new WebSocket.Server({ server });
initWss(wss);

app.use(cors());
app.use(timingLogger);
app.use(exceptionHandler);
app.use(bodyParser());

const prefix = '/api';

// public routes
const publicApiRouter = new Router({ prefix });
publicApiRouter
    .use('/users', userRouter.routes());
app
    .use(publicApiRouter.routes())
    .use(publicApiRouter.allowedMethods());

app.use(jwt(jwtConfig).unless({
    path: [
        /^\/api\/users\/signup/,
        /^\/api\/users\/login/,
        /^\/api\/profiles\//,
        /^\/api\/emails\//
    ]
}));

// protected routes
const protectedApiRouter = new Router({ prefix });
protectedApiRouter
    .use('/emails', emailRouter.routes())
    .use('/profiles', profileRouter.routes());
app
    .use(protectedApiRouter.routes())
    .use(protectedApiRouter.allowedMethods());

server.listen(3000);
console.log('started on port 3000');

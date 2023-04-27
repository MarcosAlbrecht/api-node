import fastify, { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { getProfileUserUseCase } from "./controllers/get-user-profile";
import { authenticate } from "./controllers/authenticate";

export async function appRoutes(app: FastifyInstance){
    app.post('/users', register)
    app.post('/sessions', authenticate)
    app.get('/users', getProfileUserUseCase)
}
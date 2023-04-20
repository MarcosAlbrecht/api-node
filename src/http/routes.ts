import fastify, { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { getProfileUserUseCase } from "./controllers/get-user-profile";

export async function appRoutes(app: FastifyInstance){
    app.post('/users', register)
    app.get('/users', getProfileUserUseCase)
}
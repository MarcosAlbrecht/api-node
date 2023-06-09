import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { send } from "process";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({message: 'Validation error. ', issues: error.format()})
    }
    
    if (env.NODE_ENV === 'production') {
        console.error(error)
    }else{
        //log to an external tool like DataDog, NewRelic,Sentry
    }


    return reply.status(500).send({message: 'Internal server error.'})
})

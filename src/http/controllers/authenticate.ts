import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { RegisterUseCase } from '@/services/register';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists';
import { AuthenticateUseCase } from '@/services/authenticate';
import { InvalidCredetialsError } from '@/services/errors/invalid-credentials-error';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password} = authenticateBodySchema.parse(request.body)
  
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

        const user = await authenticateUseCase.execute({ 
            email,
            password
        })

        return reply.status(200).send(user)
    } catch (err) {
        if (err instanceof InvalidCredetialsError) {
            return reply.status(400).send({message: err.message}) 
        }
        
        throw err
    }

    
}


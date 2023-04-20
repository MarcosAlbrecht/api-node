import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { RegisterUseCase } from '@/services/factories/register';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists';
import { UserProfileUseCase } from '@/services/factories/get-user-profile';
import { User } from '@prisma/client';

interface UserProfileUseCaseResponse{
    users: User[]
}

export async function getProfileUserUseCase(request: FastifyRequest, reply: FastifyReply) {  
   

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new UserProfileUseCase(prismaUsersRepository)
        
        const user = await registerUseCase.execute({});

        return reply.status(201).send(user)
            
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({message: err.message}) 
        }
        
        return reply.status(500).send( )
    }

    
}


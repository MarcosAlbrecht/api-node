import {expect, test, describe, it} from 'vitest';
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredetialsError } from './errors/invalid-credentials-error';

describe('Register Use Case', () => {
    it('Should be able to authenticate', async () => {
        const usersRepository = new InMemoryRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash('123456', 6)
            
        })

        const {user} = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })

        

        expect(user.id).toEqual(expect.any(String))
    } )

    it('Should not be able to authenticate with wrong email', async () => {
        const usersRepository = new InMemoryRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredetialsError)
        
    } )

    it('Should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash('123456', 6)
            
        })

        await expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: '1234567'
        })).rejects.toBeInstanceOf(InvalidCredetialsError)
        
    } )

    
})
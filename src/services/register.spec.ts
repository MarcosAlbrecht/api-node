import {expect, test, describe, it} from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists';

describe('Register Use Case', () => {
    it('Should be able to register', async () => {
        const usersRepository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUseCase.execute({
            name: 'Jhow Doe',
            email: 'teste@gmail.com',
            password: '123456'
        })

        

        expect(user.id).toEqual(expect.any(String))
    } )

    it('Should hash user password upon registration', async () => {
        const usersRepository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUseCase.execute({
            name: 'Jhow Doe',
            email: 'teste@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    } )

    it('Should not be able to register name email twice', async () => {
        const usersRepository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = "teste@gmail.com"

        await registerUseCase.execute({
            name: 'Jhow Doe',
            email: 'teste@gmail.com',
            password: '123456'
        })

        await expect(() => 
            registerUseCase.execute({
                name: 'Jhow Doe',
                email,
                password: '123456'
            }),
         
        ) .rejects.toBeInstanceOf(UserAlreadyExistsError)       
    })
})
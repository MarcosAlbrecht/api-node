import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryRepository implements UsersRepository{
    public items: User[] = []

    async findAll(): Promise<User[] | null> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)

        if (!user) {
            return null
        }

        return user
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: "user-1",
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
            activated: true
        }

        this.items.push(user)

        return user
    }

}

// {
//     async findByEmail(email){
//         return null
//     },

//     async findAll(){
//         return null
//     },

//     async create(data){

// }
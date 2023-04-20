import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { unwatchFile } from "fs";

export class PrismaUsersRepository implements UsersRepository {
    async findAll() {
        const users = await prisma.user.findMany()
        
        if (!users) {
            return null
        }

        return users
    }    

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },         
        })

        return user
    }

    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data,
        })

        return user
    }
    
}
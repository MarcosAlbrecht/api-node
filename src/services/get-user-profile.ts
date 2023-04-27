import { UsersRepository } from "@/repositories/users-repository"

interface UserProfileUseCaseResponse{
    id: string,
    name: string,
    email: string, 
    created_At: Date,
    activated: boolean
}

export class UserProfileUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({
       
    }): Promise<UserProfileUseCaseResponse[]> {
        
    
        const user = await this.usersRepository.findAll()
        
        
    
        if(!user){
            throw new Error("Please, login to have access")
        }

        return user.map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                created_At: user.created_at,
                activated: user.activated,
            }
        })
        
    }
}
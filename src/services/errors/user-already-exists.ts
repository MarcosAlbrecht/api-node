export class UserAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists.')
    }
}

export class ResourceNotFoundError extends Error{
    constructor(){
        super('Not users exists');
    }
}
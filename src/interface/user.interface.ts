export interface IUserSerice {
    createUser(data: unknown): Promise<unknown>
    findUser(data: unknown): Promise<unknown>
}

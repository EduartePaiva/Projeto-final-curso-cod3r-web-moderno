export default interface userInterface {
    [key: string]: any
    id?: number
    name: string
    email: string
    loggedIn: boolean
    admin?: boolean
}
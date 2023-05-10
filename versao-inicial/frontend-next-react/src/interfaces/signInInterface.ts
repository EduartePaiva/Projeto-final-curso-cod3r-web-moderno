export default interface signInInterface {
    id: number
    name: string
    email: string
    admin: boolean
    iat: number
    exp: number
    token: string
}
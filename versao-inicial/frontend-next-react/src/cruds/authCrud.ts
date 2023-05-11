import { baseApiUrl, userKey } from "@/cruds/global"
const head = new Headers()
head.append('Content-type', 'application/json; charset=UTF-8')


interface userLoginData {
    email: string,
    password: string
}

async function signinCrud(userLoginData: userLoginData) {
    const url = `${baseApiUrl}/signin`
    const fet = await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(userLoginData)
    })

    return fet
}

interface signupUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

async function signupCrud(userRegisterData: signupUser) {
    const url = `${baseApiUrl}/signup`
    const fet = await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(userRegisterData)
    })

    return fet
}

export { signinCrud, signupCrud }
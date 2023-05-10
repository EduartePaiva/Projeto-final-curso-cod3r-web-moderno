import { baseApiUrl, userKey, showError } from "@/cruds/global"

interface userLoginData {
    email: string,
    password: string
}

async function signin(userLoginData: userLoginData) {
    const url = `${baseApiUrl}/signin`
    const fet = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userLoginData)
    })

    const status = fet.status

    if (status !== 200) {
        const resposta = await fet.text()
        showError(resposta, status)
        return
    }
    return fet.json()


}

async function signup() {

}

export default { signin, signup }
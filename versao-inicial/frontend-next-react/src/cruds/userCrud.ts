import { baseApiUrl, userKey } from "@/cruds/global"
import signInInterface from "@/interfaces/signInInterface"
import userInterface from "@/interfaces/userInterface"
import userPostInterface from "@/interfaces/userPostInterface"

let token = ''
try {
  const userInfo = localStorage.getItem(userKey)
  if (userInfo !== null) {
    const userJsonInfo: signInInterface = JSON.parse(userInfo)
    token = userJsonInfo.token
  }
} catch (e) {
}


const head = new Headers()
head.append('Authorization', `bearer ${token}`)
head.append('Content-type', 'application/json; charset=UTF-8')


const getUsers = async (): Promise<userInterface[]> => {
  const url = `${baseApiUrl}/users`
  const fet = await fetch(url, {
    headers: head,
  })
  const result: userInterface[] = await fet.json()
  return result
}

const postUser = async (newUser: userPostInterface): Promise<Response> => {
  //se houver id usuário é atualizado se não houver é adicionado um novo usuário
  let url = `${baseApiUrl}/users`
  if (newUser.id) {
    url = `${baseApiUrl}/users/${newUser.id}`
    //user.id undefined porque o banco não aceita enviar uma propriedade 'id'
    //newUser.id = undefined
  }
  const fet = await fetch(url, {
    method: `${newUser.id ? 'PUT' : 'POST'}`,
    headers: head,
    body: JSON.stringify(newUser)
  })

  return fet
}

const removeUser = async (userId: number | undefined): Promise<Response> => {

  const url = `${baseApiUrl}/users/${userId}`

  const fet = await fetch(url, {
    method: 'DELETE',
    headers: head
  })
  return fet
}







export { getUsers, postUser, removeUser }
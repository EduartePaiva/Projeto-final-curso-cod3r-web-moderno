import { baseApiUrl } from "@/app/global"
import token from "@/app/tokenTemporario"
import userInterface from "@/interfaces/userInterface"
import userPostInterface from "@/interfaces/userPostInterface"


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
  }
  const fet = await fetch(url, {
    method: 'POST',
    headers: head,
    body: JSON.stringify(newUser)
  })

  return fet
}







export { getUsers, postUser }
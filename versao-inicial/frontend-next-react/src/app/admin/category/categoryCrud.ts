import { baseApiUrl } from "@/app/global"
import token from "@/app/tokenTemporario"
import categoryInterface from "@/interfaces/categoryInterface"
import categoryPostInterface from "@/interfaces/categoryPostInterface"

const head = new Headers()
head.append('Authorization', `bearer ${token}`)
head.append('Content-type', 'application/json; charset=UTF-8')

async function getCategories(): Promise<categoryInterface[]> {
    const url = `${baseApiUrl}/categories`

    const fet = await fetch(url, {
        headers: head,
    })
    const result: categoryInterface[] = await fet.json()
    return result
}

const postCategories = async (newCategory: categoryPostInterface): Promise<Response> => {

    let url = `${baseApiUrl}/categories`
    if (newCategory.id) {
        url = `${baseApiUrl}/categories/${newCategory.id}`
    }
    const fet = await fetch(url, {
        method: `${newCategory.id ? 'PUT' : 'POST'}`,
        headers: head,
        body: JSON.stringify(newCategory)
    })

    return fet
}

const removeCategory = async (categoryId: number): Promise<Response> => {
    const url = `${baseApiUrl}/categories/${categoryId}`
    const fet = await fetch(url, {
        method: 'DELETE',
        headers: head
    })
    return fet
}


export { getCategories, postCategories, removeCategory }
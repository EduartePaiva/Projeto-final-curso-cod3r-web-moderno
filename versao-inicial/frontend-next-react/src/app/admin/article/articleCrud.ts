import { baseApiUrl } from "@/app/global"
import token from "@/app/tokenTemporario"
import articleDataInterface from "@/interfaces/articleDataInterface"
import articleInterface from "@/interfaces/articleInterface"
import articleListInterface from "@/interfaces/articleListInterface"
import articlePostInterface from "@/interfaces/articlePostInterface"

const head = new Headers()
head.append('Authorization', `bearer ${token}`)
head.append('Content-type', 'application/json; charset=UTF-8')

async function removeArticle(articleId: number): Promise<Response> {

    return new Response()
}

async function getArticles(page: number): Promise<articleDataInterface> {
    let url = `${baseApiUrl}/articles?page=${page}`

    const fet = await fetch(url, {
        headers: head,
    })
    const result: articleDataInterface = await fet.json()
    return result
}

async function getArticlesById(articleId: number): Promise<articleInterface> {
    let url = `${baseApiUrl}/articles/${articleId}`

    const fet = await fetch(url, {
        headers: head,
    })
    const result: articleInterface = await fet.json()
    return result
}


const postArticles = async (newArticle: articlePostInterface): Promise<Response> => {

    let url = `${baseApiUrl}/articles`
    if (newArticle.id) {
        url = `${baseApiUrl}/articles/${newArticle.id}`
    }
    const fet = await fetch(url, {
        method: `${newArticle.id ? 'PUT' : 'POST'}`,
        headers: head,
        body: JSON.stringify(newArticle)
    })

    return fet
}


export { removeArticle, postArticles, getArticles }
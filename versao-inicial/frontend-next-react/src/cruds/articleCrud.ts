import { baseApiUrl } from "@/cruds/global"
import token from "@/cruds/tokenTemporario"
import articleByCategoryInterface from "@/interfaces/articleByCategoryInterface"
import articleDataInterface from "@/interfaces/articleDataInterface"
import articleInterface from "@/interfaces/articleInterface"
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

type getArticleType = {
    articles: articleByCategoryInterface[],
    nextPage: number
}

async function getArticlesByCategory(categoryId: number | string, page: number) {
    const url = `${baseApiUrl}/categories/${categoryId}/articles?page=${page}`

    const fet = await fetch(url, {
        headers: head,
    })
    const result: articleByCategoryInterface[] = await fet.json()
    return result
}

async function getArticlesById(articleId: string | number): Promise<articleInterface> {
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


export { removeArticle, postArticles, getArticles, getArticlesByCategory, getArticlesById }
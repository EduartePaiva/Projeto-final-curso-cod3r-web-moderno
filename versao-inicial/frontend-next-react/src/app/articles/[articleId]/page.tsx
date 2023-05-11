'use client'

import PageTitle from "@/app/admin/PageTitle"
//ArticleById

import { getArticlesById } from "@/cruds/articleCrud"
import { faFile } from "@fortawesome/free-regular-svg-icons"
import { useQuery } from "@tanstack/react-query"
import style from './style.module.css'

import DOMPurify from 'dompurify';
import { useEffect } from "react"
import hljs from "highlight.js"


function purifiedHtml(html: string) {
    return { __html: DOMPurify.sanitize(html) }
}

interface articleByIdProps {
    params: { articleId: string }
}
export default function Page({ params }: articleByIdProps) {
    const article = useQuery({
        queryKey: ['article', params.articleId],
        queryFn: () => getArticlesById(params.articleId),
        onSuccess: (artigo) => {
        }
    })

    useEffect(() => {
        document.querySelectorAll('pre').forEach(e => {
            hljs.highlightBlock(e)
        })
    }, [article.isSuccess])


    return (
        article.isSuccess &&
        <>
            <PageTitle
                icon={faFile}
                main={article.data.name}
                sub={article.data.description}
            />

            <div
                dangerouslySetInnerHTML={purifiedHtml(article.data.content)}
                className={style["article-content"]}
            />

        </>
    )
}

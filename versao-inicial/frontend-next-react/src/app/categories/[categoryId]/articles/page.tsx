'use client'
import PageTitle from '@/app/admin/PageTitle'
import { getArticlesByCategory } from '@/cruds/articleCrud'
import { getCategoryById } from '@/cruds/categoryCrud'
import articleByCategoryInterface from '@/interfaces/articleByCategoryInterface'
import categoryInterface from '@/interfaces/categoryInterface'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react'
import style from './page.module.css'
import ArticleItem from '@/components/article/ArticleItem'

//equivale ao articleByCategory.vue

interface articlePageProps {
    params: { categoryId: string }
}

export default function Page({ params }: articlePageProps) {
    const [page, setPage] = useState(1)
    const [pageEnded, setPageEnded] = useState(false)
    const [pageData, setPageData] = useState<articleByCategoryInterface[]>()
    const [categoryData, setCategoryData] = useState<categoryInterface>()

    useEffect(() => {
        getCategoryById(params.categoryId)
            .then(category => setCategoryData(category))
    }, [params.categoryId])

    useEffect(() => {
        if (categoryData) {
            getArticlesByCategory(categoryData.id, page)
                .then(data => {
                    if (data.length !== 0) {
                        setPageData(prevData => {
                            if (prevData) {
                                return prevData.concat(data)
                            } else {
                                return data
                            }
                        })
                        // este < 10 é nº de itens que o backend responde. no caso ele envia uma array.length de até 10
                        if (data.length < 10) setPageEnded(true)
                    } else {
                        setPageEnded(true)
                    }
                })
        }
    }, [page, categoryData])



    return (
        <div className={style['articles-by-category']}>
            {categoryData ?
                <PageTitle icon={faFolder} main={categoryData.name} sub='Categoria' /> :
                <PageTitle icon={faFolder} main={'Carregando'} sub='Categoria' />
            }
            {pageData && (
                <>
                    <ul>
                        {pageData.map((article, index) => <ArticleItem key={index} {...article} />)}
                    </ul>
                    <div className={style['load-more']}>
                        {!pageEnded &&
                            <button onClick={() => { setPage(prev => prev + 1) }}
                                className='btn btn-outline-primary'>
                                Carregar Mais Artigos
                            </button>
                        }
                    </div>

                </>
            )}
        </div>
    )
}

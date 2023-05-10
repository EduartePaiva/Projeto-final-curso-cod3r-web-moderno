import articleByCategoryInterface from "@/interfaces/articleByCategoryInterface";
import Link from "next/link";
import style from './ArticleItemStyle.module.css'
import Image from "next/image";
import articlePng from '@/assets/article.png'

export default function ArticleItem(article: articleByCategoryInterface) {
    return (
        <div className={style["article-item"]}>
            <Link href={`articles/${article.id}`}>
                <div className={`${style['article-item-image']} d-none d-sm-block`}>
                    <Image
                        alt="Article"
                        height={150}
                        width={150}

                        src={article.imageUrl ? article.imageUrl : articlePng} />
                </div>
                <div className={style['article-item-info']}>
                    <h2>{article.name}</h2>
                    <p>{article.description}</p>
                    <span className={style['article-item-author']}>
                        <strong>Author: </strong>{article.author}
                    </span>
                </div>
            </Link>
        </div>
    )
}

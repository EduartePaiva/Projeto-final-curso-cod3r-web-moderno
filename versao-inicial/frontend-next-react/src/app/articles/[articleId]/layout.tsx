import style from './style.module.css'
import 'highlight.js/styles/github-dark.css'

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className={style['article-by-id']}>
            {children}

        </section>

    );
}
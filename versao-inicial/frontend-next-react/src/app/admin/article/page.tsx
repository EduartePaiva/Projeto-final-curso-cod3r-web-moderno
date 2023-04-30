import NavLinks from '../NavLinks'
import style from '../adminPageTabs.module.scss'

export default function ArticlePage() {
    return (
        <>
            <NavLinks navAtiva='article' />
            <div className={`${style['tab-content']} p-3 bg-white article-admin`}>
                <h1>Artigo Componente</h1>
            </div>

        </>
    )
}
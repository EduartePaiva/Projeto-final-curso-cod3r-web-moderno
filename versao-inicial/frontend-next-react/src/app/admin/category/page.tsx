import NavLinks from '../NavLinks'
import style from '../adminPageTabs.module.scss'

export default function CategoryPage(props: { visible: boolean }) {
    return (
        <>
            <NavLinks navAtiva='category' />
            <div className={`${style['tab-content']} p-3 bg-white category-admin`}>
                <h1>Categorias</h1>
            </div>

        </>
    )
}
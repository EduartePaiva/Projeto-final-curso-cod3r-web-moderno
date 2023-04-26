import Link from 'next/link'
import style from '../adminPageTabs.module.scss'
import NavLinks from '../NavLinks'

export default function AdminPagesTabs() {
    return (
        <>
            <NavLinks navAtiva='teste' />
            <div className={`${style['tab-content']} p-3 bg-white category-admin`}>
                <h1>Conteúdo de teste</h1>
            </div>

        </>

    )
}
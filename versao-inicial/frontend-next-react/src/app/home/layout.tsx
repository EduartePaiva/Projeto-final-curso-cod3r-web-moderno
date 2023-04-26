
import { faHome } from '@fortawesome/free-solid-svg-icons'
import PageTitle from '../admin/PageTitle'
import style from './page.module.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="home">
                <PageTitle main="Dashboard" icon={faHome} sub="Base de Conhecimento"></PageTitle>
                <div className={style['stats']}>
                    {children}
                </div>
            </div>

        </>


    )
}
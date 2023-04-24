import PageTitle from "../admin/PageTitle";
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    return (
        <div className="home">
            <PageTitle main="Dashboard" icon={faHome} sub="Base de Conhecimento"></PageTitle>
        </div>
    )
}
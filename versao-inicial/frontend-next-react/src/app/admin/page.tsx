import PageTitle from "./PageTitle";
import { faCogs } from '@fortawesome/free-solid-svg-icons'


export default function AdminPages() {
    return (
        <div className="admin-pages">
            <PageTitle main="Administração do Sistema" sub="Cadastros & Cia" icon={faCogs}></PageTitle>
        </div>
    )
}
import PageTitle from "../admin/PageTitle";
import { faFile, faFolder, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { baseApiUrl } from "@/global";
import statInterface from "@/interfaces/statInterface";
import style from './page.module.css'
import Stat from "./component.Stat";

async function getStats(): Promise<statInterface> {
    const stat = await fetch(`${baseApiUrl}/stats`)
    const result: statInterface = await stat.json()
    return result
}

export default async function Home() {
    const statDados = await getStats()
    return (
        <div className="home">
            <PageTitle main="Dashboard" icon={faHome} sub="Base de Conhecimento"></PageTitle>
            <div className={style['stats']}>
                <Stat
                    title="Categorias"
                    value={statDados.categories}
                    icon={faFolder}
                    color="#d54d50"
                />
                <Stat
                    title="Artigos"
                    value={statDados.articles}
                    icon={faFile}
                    color="#3bc480"
                />
                <Stat
                    title="Usuários"
                    value={statDados.users}
                    icon={faUser}
                    color="#3282cd"
                />
            </div>
        </div>
    )
}
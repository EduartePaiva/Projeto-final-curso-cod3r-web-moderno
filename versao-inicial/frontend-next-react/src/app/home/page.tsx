import { faFile, faFolder, faUser } from '@fortawesome/free-solid-svg-icons'
import { baseApiUrl } from "@/app/global";
import statInterface from "@/interfaces/statInterface";

import Stat from "./component.Stat";
import token from '../tokenTemporario'

async function getStats(): Promise<statInterface> {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', 'bearer ' + token)
    const stat = await fetch(`${baseApiUrl}/stats`, {
        method: 'GET',
        headers: myHeaders,
        next: { revalidate: 60 },
    })

    const result: statInterface = await stat.json()
    return result
}
let statDados: statInterface = {
    articles: 0, categories: 0, users: 0
}

export default async function Home() {

    statDados = await getStats()

    return (
        <>
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
        </>
    )
}
'use client'
import { faFile, faFolder, faUser } from '@fortawesome/free-solid-svg-icons'
import { baseApiUrl, userKey } from "@/cruds/global";
import statInterface from "@/interfaces/statInterface";
import Stat from "./component.Stat";
import { useQuery } from '@tanstack/react-query'
import signInInterface from '@/interfaces/signInInterface';

async function getStats(): Promise<statInterface> {
    let token = ''
    try {
        const userInfo = localStorage.getItem(userKey)
        if (userInfo !== null) {
            const userJsonInfo: signInInterface = JSON.parse(userInfo)
            token = userJsonInfo.token
        }
    } catch (e) { }

    const myHeaders = new Headers()
    myHeaders.append('Authorization', 'bearer ' + token)
    const stat = await fetch(`${baseApiUrl}/stats`, {
        method: 'GET',
        headers: myHeaders
    })

    const result: statInterface = await stat.json()
    return result
}
let statDados: statInterface = {
    articles: 0, categories: 0, users: 0
}

export default function Home() {
    const statDadosFromQuery = useQuery({
        queryKey: ['stat'],
        queryFn: getStats
    })
    if (statDadosFromQuery.data) {
        statDados = statDadosFromQuery.data
    }

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
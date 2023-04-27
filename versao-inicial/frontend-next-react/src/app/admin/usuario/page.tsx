import userInterface from '@/interfaces/userInterface'
import token from '../../tokenTemporario'
import { baseApiUrl } from '@/app/global'
import NavLinks from '../NavLinks'
import BootstrapUsersReactTable2 from './BootstrapReactUsersTable'


export default async function Usuarios(props: { visible: boolean }) {
    const url = `${baseApiUrl}/users`
    const head = new Headers()
    head.append('Authorization', `bearer ${token}`)
    const fet = await fetch(url, {
        headers: head,
    })
    const result: userInterface[] = await fet.json()


    console.log('reload')
    return (
        <>
            <NavLinks navAtiva='usuario' />
            <div className='tab-content p-3 bg-white user-admin'>
                <BootstrapUsersReactTable2 dados={result}></BootstrapUsersReactTable2>
            </div>
        </>
    )
}
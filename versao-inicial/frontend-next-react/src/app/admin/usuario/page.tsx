import userInterface from '@/interfaces/userInterface'
import token from '../../tokenTemporario'
import { baseApiUrl } from '@/app/global'
import NavLinks from '../NavLinks'



function exibirUsuarios(users: userInterface[]) {
    const listaDeUsuarios = users.map((user => {
        return (
            <tr key={user.id}>
                <th scope='row'>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{`${user.admin ? 'Sim' : 'Não'}`}</td>
                <td></td>
            </tr>
        )


        //< li key = { user.id } > User: { user.name }; Email: { user.email }</li >
    }))

    return listaDeUsuarios
}

let data_schema = {
    mode: 'save',
    user: {},
    users: [],
    fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'email', label: 'E-mail', sortable: true },
        { key: 'admin', label: 'Administrador', sortable: true, formatter: (value: boolean) => value ? 'Sim' : 'Não' },
        { key: 'actions', label: 'Ações' }
    ]
}


export default async function Usuarios(props: { visible: boolean }) {
    const url = `${baseApiUrl}/users`
    const head = new Headers()
    head.append('Authorization', `bearer ${token}`)
    const fet = await fetch(url, {
        headers: head,
    })
    const result: userInterface[] = await fet.json()

    const usuarios = exibirUsuarios(result)


    console.log('reload')
    return (
        <>
            <NavLinks navAtiva='usuario' />
            <div className='tab-content p-3 bg-white user-admin'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Administrador</th>
                            <th scope='col'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios}

                    </tbody>
                </table>


            </div>
        </>
    )
}
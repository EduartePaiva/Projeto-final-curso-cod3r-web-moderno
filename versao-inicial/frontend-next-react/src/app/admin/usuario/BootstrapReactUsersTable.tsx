'use client'

import bootstrapTableData from '@/interfaces/bootstrapTableData'
import userInterface from '@/interfaces/userInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'



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
    }))

    return listaDeUsuarios
}

function escolherIcone(sortDoItem: sortSelecionado, sortSelecionado: sortSelecionado, organizarElementos: organizarElementos): IconProp {
    if (sortDoItem === sortSelecionado) {
        if (organizarElementos === 'crescente') {
            return faSortUp
        }
        if (organizarElementos === 'decrescente') {
            return faSortDown
        }
    }
    return faSort
}


type sortSelecionado = 'codigo' | 'nome' | 'email' | 'admin' | ''
type organizarElementos = 'crescente' | 'decrescente'

function sortUsuarios(usuarios: userInterface[], sortSelecionado: sortSelecionado, organizarElementos: organizarElementos): userInterface[] {
    if (sortSelecionado === '') return usuarios

    let key = 'codigo'
    switch (sortSelecionado) {
        case 'codigo':
            key = 'id'
            break
        case 'nome':
            key = 'name'
            break
        case 'email':
            key = 'email'
            break
        case 'admin':
            key = 'admin'
            break
    }

    if (organizarElementos === 'crescente') {
        usuarios.sort((a, b) => {
            console.log(key)
            if (key === 'name' || key === 'email') return a[key].localeCompare(b[key])

            if (key === 'codigo' || key === 'admin') {

                return a[key] > b[key] ? -1 : 1
            }

        })
    }
    if (organizarElementos === 'decrescente') {
        usuarios.sort((a, b) => a[key] < b[key] ? -1 : 1)
    }

    return usuarios
}



export default function BootstrapUsersReactTable(props: bootstrapTableData) {
    const [sortSelecionado, setSortSelecionado] = useState<sortSelecionado>('')
    const [organizarElementos, setOrganizarElementos] = useState<organizarElementos>('crescente')

    const [usuarios, setUsuarios] = useState(props.dados)


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Código
                        <button
                            className={`p-2 ${sortSelecionado !== 'codigo' ? 'opacity-40' : ''} hover:opacity-100`}
                            onClick={() => {
                                setSortSelecionado((oldsort) => {
                                    if (oldsort === 'codigo') {
                                        if (organizarElementos === 'crescente') {
                                            setOrganizarElementos('decrescente')
                                        }
                                        if (organizarElementos === 'decrescente') {
                                            setOrganizarElementos('crescente')
                                        }
                                    } else {
                                        setOrganizarElementos('crescente')
                                    }
                                    return 'codigo'
                                })
                                setUsuarios((oldUser => sortUsuarios(oldUser, sortSelecionado, organizarElementos)))
                            }}
                        >
                            <FontAwesomeIcon icon={escolherIcone('codigo', sortSelecionado, organizarElementos)} />
                        </button>
                    </th>
                    <th scope="col">Nome
                        <button
                            className={`p-2 ${sortSelecionado !== 'nome' ? 'opacity-40' : ''} hover:opacity-100`}
                            onClick={() => {
                                setSortSelecionado((oldsort) => {
                                    if (oldsort === 'nome') {

                                        if (organizarElementos === 'crescente') {
                                            setOrganizarElementos('decrescente')
                                        }
                                        if (organizarElementos === 'decrescente') {
                                            setOrganizarElementos('crescente')
                                        }
                                    } else {
                                        setOrganizarElementos('crescente')
                                    }
                                    return 'nome'
                                })
                                setUsuarios((oldUser => sortUsuarios(oldUser, sortSelecionado, organizarElementos)))
                            }}
                        >
                            <FontAwesomeIcon icon={escolherIcone('nome', sortSelecionado, organizarElementos)} />
                        </button>
                    </th>
                    <th scope="col">E-mail
                        <button
                            className={`p-2 ${sortSelecionado !== 'email' ? 'opacity-40' : ''} hover:opacity-100`}
                            onClick={() => {
                                setSortSelecionado((oldsort) => {
                                    if (oldsort === 'email') {
                                        if (organizarElementos === 'crescente') {
                                            setOrganizarElementos('decrescente')
                                        }
                                        if (organizarElementos === 'decrescente') {
                                            setOrganizarElementos('crescente')
                                        }
                                    } else {
                                        setOrganizarElementos('crescente')
                                    }
                                    return 'email'
                                })
                                setUsuarios((oldUser => sortUsuarios(oldUser, sortSelecionado, organizarElementos)))
                            }}
                        >
                            <FontAwesomeIcon icon={escolherIcone('email', sortSelecionado, organizarElementos)} />
                        </button>
                    </th>
                    <th scope="col">Administrador
                        <button
                            className={`p-2 ${sortSelecionado !== 'admin' ? 'opacity-40' : ''} hover:opacity-100`}
                            onClick={() => {
                                setSortSelecionado((oldsort) => {
                                    if (oldsort === 'admin') {
                                        if (organizarElementos === 'crescente') {
                                            setOrganizarElementos('decrescente')
                                        }
                                        if (organizarElementos === 'decrescente') {
                                            setOrganizarElementos('crescente')
                                        }
                                    } else {
                                        setOrganizarElementos('crescente')
                                    }
                                    return 'admin'
                                })
                                setUsuarios((oldUser => sortUsuarios(oldUser, sortSelecionado, organizarElementos)))
                            }}
                        >
                            <FontAwesomeIcon icon={escolherIcone('admin', sortSelecionado, organizarElementos)} />
                        </button>
                    </th>
                    <th scope='col'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {exibirUsuarios(usuarios)}
            </tbody>
        </table>
    )
}
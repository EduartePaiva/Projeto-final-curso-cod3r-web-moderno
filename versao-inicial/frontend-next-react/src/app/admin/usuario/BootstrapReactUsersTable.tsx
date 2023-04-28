'use client'

import bootstrapTableData from '@/interfaces/bootstrapTableData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { MouseEventHandler, useCallback, useState } from 'react'
import userInterface from '@/interfaces/userInterface'
import { data } from 'autoprefixer'

interface sortB {
    sortOrder: sortReder,
    columnKey: sortKey,
    sortKey: sortKey,
    onClick: MouseEventHandler<HTMLButtonElement>,
    sortable: boolean,
}

function SortButton(props: sortB) {
    if (!props.sortable) {
        return null
    }

    let faIcon = faSort
    if (props.columnKey === props.sortKey) {
        if (props.sortOrder === 'ascn') {
            faIcon = faSortUp
        } else {
            faIcon = faSortDown
        }
    }

    return (
        <button
            className={`p-2 ${props.columnKey !== props.sortKey ? 'opacity-40' : ''} hover:opacity-100`}
            onClick={props.onClick}
        >

            <FontAwesomeIcon icon={faIcon} />
        </button>
    )
}

function sortData(tableData: userInterface[], sortKey: sortKey, reverse: boolean) {
    if (!sortKey) return tableData
    //const data = tableData

    tableData.sort((a, b) => {
        if (sortKey === 'admin') {
            return a[sortKey] < b[sortKey] ? 1 : -1
        }
        return a[sortKey] > b[sortKey] ? 1 : -1
    })

    if (reverse) {
        return tableData.reverse()
    }

    return tableData
}



type sortKey = keyof userInterface



type sortReder = 'ascn' | 'desc'

export default function BootstrapUsersReactTable(props: bootstrapTableData) {
    console.log('teste')
    const [sortKey, setSortKey] = useState<sortKey>('id')
    const [sortOrder, setSortOrder] = useState<sortReder>('ascn')

    //use callback só é chamado quando uma das dependência muda
    const sortedData = useCallback(
        () => sortData(props.dados, sortKey, sortOrder === 'desc'),
        [props.dados, sortKey, sortOrder]
    )
    const headers: { key: sortKey, label: string, sortable?: boolean }[] = [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'email', label: 'E-mail', sortable: true },
        { key: 'admin', label: 'Administrador', sortable: true },
        { key: 'actions', label: 'Ações' }
    ]

    function changeSort(key: sortKey) {
        if (key === sortKey) {
            setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn')
        }
        setSortKey(key)
    }
    return (
        <table className="table table-striped">
            <thead>
                <tr className=''>
                    {headers.map((header) =>
                        <th scope='col' className='align-middle' key={header.key}>
                            {header.label}
                            <SortButton
                                columnKey={header.key}
                                sortable={header.sortable ?? false}
                                onClick={() => changeSort(header.key)}
                                sortOrder={sortOrder}
                                sortKey={sortKey}
                            />
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {sortedData().map((usuario) =>
                    <tr key={usuario.id}>
                        <th scope='row'>{usuario.id}</th>
                        <td>{usuario.name}</td>
                        <td>{usuario.email}</td>
                        <td>{`${usuario.admin ? 'Sim' : 'Não'}`}</td>
                        <td></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
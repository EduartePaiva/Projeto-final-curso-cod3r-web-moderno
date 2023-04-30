'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MouseEventHandler, useCallback, useState } from 'react'
import categoryInterface from '@/interfaces/categoryInterface'

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

function sortData(tableData: categoryInterface[], sortKey: sortKey, reverse: boolean) {
    if (!sortKey) return tableData
    //const data = tableData

    tableData.sort((a, b) => {
        if (sortKey === 'name' || sortKey === 'path') {
            return Intl.Collator().compare(a[sortKey], b[sortKey])
        }
        return a[sortKey] > b[sortKey] ? 1 : -1
    })
    if (reverse) {
        return tableData.reverse()
    }
    return tableData
}

type sortKey = keyof categoryInterface
type sortReder = 'ascn' | 'desc'


interface bootstraptableData {
    dados: categoryInterface[],
    loadCategory: (mode: 'save' | 'remove' | 'update', category: categoryInterface) => void
}

export default function BootstrapReactCategoriesTable(props: bootstraptableData) {
    const [sortKey, setSortKey] = useState<sortKey>('path')
    const [sortOrder, setSortOrder] = useState<sortReder>('ascn')

    //use callback só é chamado quando uma das dependência muda
    const sortedData = useCallback(
        () => sortData(props.dados, sortKey, sortOrder === 'desc'),
        [props.dados, sortKey, sortOrder]
    )
    const headers: { key: sortKey, label: string, sortable?: boolean }[] = [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'path', label: 'Caminho', sortable: true },
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
                {sortedData().map((category) =>
                    <tr key={category.id}>
                        <th scope='row'>{category.id}</th>
                        <td>{category.name}</td>
                        <td>{category.path}</td>
                        <td>
                            <button
                                type='button'
                                className='btn btn-warning mr-2'
                                onClick={() => { props.loadCategory('update', category) }}>
                                <FontAwesomeIcon icon={faPencil} />
                            </button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => { props.loadCategory('remove', category) }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
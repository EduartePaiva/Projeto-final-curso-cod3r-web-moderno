'use client'


import articleListInterface from "@/interfaces/articleListInterface"
import { faPencil, faSort, faSortDown, faSortUp, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEventHandler, useCallback, useState } from "react"

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

function sortData(tableData: articleListInterface[], sortKey: sortKey, reverse: boolean) {
    if (!sortKey) return tableData
    //const data = tableData

    tableData.sort((a, b) => {
        if (sortKey === 'name') {
            return Intl.Collator().compare(a[sortKey], b[sortKey])
        }
        return a[sortKey] > b[sortKey] ? 1 : -1
    })
    if (reverse) {
        return tableData.reverse()
    }
    return tableData
}


type sortKey = keyof articleListInterface
type sortReder = 'ascn' | 'desc'


type mode = 'save' | 'remove' | 'update'
interface propsBootReact {
    dados: articleListInterface[],
    loadArticles: (mode: mode, article: articleListInterface) => void
}
export default function BootstrapReactArticlesTable(props: propsBootReact) {
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
        { key: 'description', label: 'Descrição' },
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
                {sortedData().map((article) =>
                    <tr key={article.id}>
                        <th scope='row'>{article.id}</th>
                        <td>{article.name}</td>
                        <td>{article.description}</td>
                        <td>
                            <button
                                type='button'
                                className='btn btn-warning mr-2'
                                onClick={() => { props.loadArticles('update', article) }}>
                                <FontAwesomeIcon icon={faPencil} />
                            </button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => { props.loadArticles('remove', article) }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
'use client'
import { getTreeData } from '@/cruds/categoryCrud'
import categoryTreeData from '@/interfaces/categoryTreeData'
import style from '@/styles/Menu.module.css'
import { ChangeEvent, useState } from 'react'
import { TreeView } from '@mui/lab';
import { ExpandMore, ChevronRight, Search } from '@mui/icons-material'
import SidebarMuiVersion from '@/components/sidebar/SidebarMuiVersion'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

function filtrarCategoria(palavraAfiltrar: string, newTree: categoryTreeData[], expanded: string[]): categoryTreeData[] {
  return newTree.filter((valor) => {
    if (valor.name.toLocaleLowerCase().includes(palavraAfiltrar)) {
      return valor
    }

    if (valor.children.length > 0) {
      const child = filtrarCategoria(palavraAfiltrar, valor.children, expanded)
      if (child.length > 0) {
        expanded.push(`${valor.id}`)
        valor.children = child

        return valor
      }
    }
  })
}

export default function Menu(props: { ocultarMenu: boolean }) {
  const [treeData, setTreeData] = useState<categoryTreeData[]>()
  const [expanded, setExpanded] = useState<string[]>([])
  const router = useRouter()

  const currentTreeData = useQuery({
    queryKey: ['treeData'],
    queryFn: getTreeData,
    onSuccess: (res) => {
      setTreeData(res)
    },
    refetchOnWindowFocus: false
  })


  function pesquisarCategoria(e: ChangeEvent<HTMLInputElement>) {
    const palavraAfiltrar = e.target.value.toLowerCase()
    if (!currentTreeData.data) return
    if (!treeData) return
    if (palavraAfiltrar === '') {
      setTreeData(currentTreeData.data)
      setExpanded([])
      return
    }

    let lista: string[] = []

    const treeClone = structuredClone(currentTreeData.data)
    const novaTree = filtrarCategoria(palavraAfiltrar, treeClone, lista)

    setExpanded(lista)
    console.log(novaTree)
    setTreeData(novaTree)
  }


  return (
    <aside className={style.menu}>
      {treeData &&
        <>
          {!props.ocultarMenu &&
            <div className={style['menu-filter']}>
              <Search fontSize='medium' className='text-white mr-2' />
              <input type="text" onChange={pesquisarCategoria} placeholder='Digite para filtrar...' />
            </div>

          }

          {(treeData.length > 0) ?
            <TreeView
              className={props.ocultarMenu ? 'hidden' : ''}
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMore fontSize='inherit' />}
              defaultExpandIcon={<ChevronRight fontSize='inherit' />}
              sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              expanded={expanded}
              onNodeToggle={(event: React.SyntheticEvent, nodeIds: string[]) => {
                setExpanded(nodeIds)
              }}
              onNodeSelect={(e: React.SyntheticEvent, nodeId: string) => {
                router.push(`categories/${nodeId}/articles`)
              }}

            >
              <div>
                {treeData.map((item) => {
                  return <SidebarMuiVersion key={item.id} item={item} />
                })}
              </div>

            </TreeView>
            :
            <p className='text-white text-lg m-2'>Nenhuma categoria encontrada...</p>
          }


        </>
      }
    </aside>
  )
}

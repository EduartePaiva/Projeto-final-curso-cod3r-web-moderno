'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { getCategories, postCategories, removeCategory } from "../../../cruds/categoryCrud"
import CaixaSelectBootstrap from "./CaixaSelectBootstrap"
import BootstrapReactCategoriesTable from "./BootstrapReactCategoriesTable"
import categoryInterface from "@/interfaces/categoryInterface"
import { toast } from "react-toastify"
import categoryPostInterface from "@/interfaces/categoryPostInterface"

type mode = 'save' | 'remove' | 'update'

const voidCategoryPost: categoryPostInterface = {
  name: '',
  parentId: null,
}



function mostrarNotificacao(mensagem: string, codigo?: number) {
  switch (codigo) {
    case 500:
      toast.error(`😵 Erro no servidor: ${mensagem}`)
      break;
    case 400:
      toast.warn(`🤔 ${mensagem}`)
      break
    case 204:
      toast.success(`👌 Operação realizada com sucesso!!`)
      break
    default:
      toast(`${mensagem}`)
      break
  }
}

export default function CategoryPage() {
  const [mode, setMode] = useState<mode>('save')
  const QueryClient = useQueryClient()
  const [categoryPost, setCategoryPost] = useState(voidCategoryPost)


  const listaDeCategorias = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  //Adiciona ou altera categoria
  const addOrUpdateCategory = useMutation({
    mutationFn: postCategories,
    onSuccess: async (resposta) => {
      const resporta = await resposta.text()
      await QueryClient.invalidateQueries({
        queryKey: ['categories']
      })
      mostrarNotificacao(resporta, resposta.status)
      setMode('save')
      setCategoryPost(voidCategoryPost)
    }
  })

  //Exclui uma categoria
  const deleteCategory = useMutation({
    mutationFn: removeCategory,
    onSuccess: async (value) => {
      const resporta = await value.text()
      await QueryClient.invalidateQueries({ queryKey: ['categories'] })
      mostrarNotificacao(resporta, value.status)
      setMode('save')
      setCategoryPost(voidCategoryPost)
    }
  })

  function loadCategories(mode: mode, category: categoryInterface) {
    setCategoryPost({
      name: category.name,
      parentId: category.parentId,
      id: category.id
    })

    if (mode === 'remove') {
      setMode('remove')
      toast.warn(`Excluir ${category.name}?`)
    }

    if (mode === 'update') {
      setMode('update')
      toast.warn(`Atualizar ${category.name}?`)
    }

  }





  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (mode === 'remove' && categoryPost.id) {
          deleteCategory.mutate(categoryPost.id)
        } else {
          addOrUpdateCategory.mutate(categoryPost)
        }
      }}>
        <div className='row'>
          <div className='mb-3'>
            <label htmlFor="category-name" className='form-label'>Nome:</label>
            <input
              disabled={mode === 'remove'}
              type="text"
              className='form-control'
              id='category-name'
              typeof='text'
              placeholder='Informe o Nome da Categoria...'
              required
              value={categoryPost.name}
              onChange={(e) => {
                setCategoryPost((prevValue) => {
                  return { ...prevValue, name: e.target.value }
                })
              }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="parent-category" className='form-label'>Categoria Pai:</label>

            <select
              className="form-select"
              aria-label="Selecione categoria pai"
              value={categoryPost.parentId ?? 0}
              disabled={mode === 'remove'}
              onChange={(e) => {
                const parentStringToNumber = Number.parseInt(e.target.value)
                const parentId = parentStringToNumber === 0 ? null : parentStringToNumber
                setCategoryPost((prevValue) => {
                  return { ...prevValue, parentId: parentId }
                })
              }}
            >
              {listaDeCategorias.isLoading ?
                (<option value={0}>Carregando...</option>) :
                <option selected value={0}>Selecionar Categoria</option>
              }
              {listaDeCategorias.isError && <option>Erro ao carregar lista de usuários</option>}
              {listaDeCategorias.data && <CaixaSelectBootstrap dados={listaDeCategorias.data} />}
            </select>
          </div>
        </div>

        {mode === 'save' && <button type="submit" className={`btn btn-primary ${false && 'disabled'}`}>Salvar</button>}
        {mode === 'remove' && <button type="submit" className="btn btn-danger">Excluir</button>}
        {mode === 'update' && <button type="submit" className="btn btn-success">Atualizar</button>}
        <button type='reset' onClick={(e) => { setMode('save'); setCategoryPost(voidCategoryPost) }} className="btn btn-secondary ml-2">Cancelar</button>
      </form >

      {/* Tabela que deu trabalho!!! */}
      {listaDeCategorias.isLoading && (<h1>Carregando...</h1>)}
      {listaDeCategorias.isError && <h1>Erro ao carregar lista de usuários</h1>}
      {listaDeCategorias.data && <BootstrapReactCategoriesTable dados={listaDeCategorias.data} loadCategory={loadCategories} />}


    </>
  )
}
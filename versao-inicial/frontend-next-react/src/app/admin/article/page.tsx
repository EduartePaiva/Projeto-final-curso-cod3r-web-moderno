'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { getArticles, postArticles, removeArticle } from "./articleCrud"
import CaixaSelectBootstrap from "./CaixaSelectBootstrap"
import BootstrapReactArticlesTable from "./BootstrapReactArticlesTable"
import { toast } from "react-toastify"
import articlePostInterface from "@/interfaces/articlePostInterface"
import { getCategories } from "../category/categoryCrud"
import { getUsers } from "../usuario/userCrud"
import useTextEditor from "@/components/adminComponents/articleComponents/useTextEditor"
import articleListInterface from "@/interfaces/articleListInterface"

type mode = 'save' | 'remove' | 'update'

const voidArticlePost: articlePostInterface = {
  categoryId: null,
  userId: null,
  name: '',
  description: ''
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

export default function articlePage() {
  const { quillState, renderTextEditor } = useTextEditor()
  const [mode, setMode] = useState<mode>('save')
  const QueryClient = useQueryClient()
  const [articlePost, setArticlePost] = useState(voidArticlePost)
  const [articlePage, setArticlePage] = useState(1)

  //console.log(articlePost)

  const listaDeArtigos = useQuery({
    queryKey: ['articles', { articlePage }],
    keepPreviousData: true,
    queryFn: () => getArticles(articlePage)
  })

  const listaDeCategorias = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  const listaDeAutores = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  //Adiciona ou altera artigo
  const addOrUpdateArticle = useMutation({
    mutationFn: postArticles,
    onSuccess: async (resposta) => {
      const resporta = await resposta.text()
      await QueryClient.invalidateQueries({
        queryKey: ['articles']
      })
      mostrarNotificacao(resporta, resposta.status)
      setMode('save')
      setArticlePost(voidArticlePost)
    }
  })

  //Exclui uma artigo
  const deleteArticle = useMutation({
    mutationFn: removeArticle,
    onSuccess: async (value) => {
      const resporta = await value.text()
      await QueryClient.invalidateQueries({ queryKey: ['articles'] })
      mostrarNotificacao(resporta, value.status)
      setMode('save')
      setArticlePost(voidArticlePost)
    }
  })

  function loadArticles(mode: mode, article: articleListInterface) {
    //vou precisar trabalhar nisto aqui
    setArticlePost({
      name: article.name,
      id: article.id,
      description: article.description,
      categoryId: article.categoryId,
      userId: article.userId
    })

    if (mode === 'remove') {
      setMode('remove')
      toast.warn(`Excluir ${article.name}?`)
    }

    if (mode === 'update') {
      setMode('update')
      toast.warn(`Atualizar ${article.name}?`)
    }

  }

  function renderPageLinks() {
    if (listaDeArtigos.data) {
      const count = listaDeArtigos.data.count
      const limit = listaDeArtigos.data.limit
      const numPaginas = Math.ceil(count / limit)

      let listaDePaginas: JSX.Element[] = []

      for (let i = 1; i <= numPaginas; i++) {
        const hidden =
          ((articlePage + 1 < i) || (articlePage - 1 > i) && numPaginas >= 3) &&
          !(numPaginas >= 3 && articlePage < 2 && i == 3) &&
          !(articlePage == numPaginas && numPaginas >= 3 && i == articlePage - 2)

        listaDePaginas.push(
          <li key={i} className={`page-item ${articlePage === i ? 'active' : ''} ${hidden ? 'hidden' : ''}`}>
            <button
              onClick={() => {
                setArticlePage(i)
                QueryClient.invalidateQueries({
                  queryKey: ['articles'],
                  exact: true
                })
              }}
              className="page-link">
              {i}
            </button>
          </li>
        )
      }

      return listaDePaginas
    }
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (mode === 'remove' && articlePost.id) {
          deleteArticle.mutate(articlePost.id)
        } else {
          //const content = quillState?.root.innerHTML
          //var enc = new TextEncoder();
          addOrUpdateArticle.mutate({
            content: quillState?.root.innerHTML,
            ...articlePost
          })
        }
        if (quillState) quillState.root.innerHTML = '';
      }}>
        <div className='row'>

          {/* Nome do artigo */}
          <div className='mb-3'>
            <label htmlFor="article-name" className='form-label'>Nome:</label>
            <input
              required
              disabled={mode === 'remove'}
              type="text"
              className='form-control'
              id='article-name'
              typeof='text'
              placeholder='Informe o Nome da Artigo...'

              value={articlePost.name}
              onChange={(e) => {
                setArticlePost((prevValue) => {
                  return { ...prevValue, name: e.target.value }
                })
              }}
            />
          </div>

          {/* Descrição do artigo */}
          <div className='mb-3'>
            <label htmlFor="article-description" className='form-label'>Descrição:</label>
            <input
              required
              disabled={mode === 'remove'}
              type="text"
              className='form-control'
              id='article-description'
              typeof='text'
              placeholder='Informe a Descrição da Artigo...'

              value={articlePost.description}
              onChange={(e) => {
                setArticlePost((prevValue) => {
                  return { ...prevValue, description: e.target.value }
                })
              }}
            />
          </div>

          {/* imagem url do artigo */}
          <div className='mb-3'>
            <label htmlFor="article-name" className='form-label'>Imagem (URL):</label>
            <input
              disabled={mode === 'remove'}
              type="url"
              className='form-control'
              id='article-name'
              typeof='url'
              placeholder='Informe a Url da Imagem do Artigo...'
              value={articlePost.imageUrl}
              onChange={(e) => {
                setArticlePost((prevValue) => {
                  return { ...prevValue, imageUrl: e.target.value }
                })
              }}
            />
          </div>

          {/* Categoria do artigo */}
          <div className='mb-3'>
            <label htmlFor="category-article" className='form-label'>Categoria:</label>
            <select
              className="form-select"
              required
              aria-label="Selecione a categoria do artigo"
              value={articlePost.categoryId ?? 0}
              disabled={mode === 'remove'}
              onChange={(e) => {
                const categoryStringToNumber = Number.parseInt(e.target.value)

                const categoryId = Number.isNaN(categoryStringToNumber) ? null : categoryStringToNumber
                setArticlePost((prevValue) => {
                  return { ...prevValue, categoryId: categoryId }
                })
              }}
            >
              {listaDeCategorias.isLoading ?
                (<option value=''>Carregando...</option>) :
                <option selected value=''>Selecionar a Categoria</option>
              }
              {listaDeCategorias.isError && <option>Erro ao carregar lista de usuários</option>}
              {listaDeCategorias.data && <CaixaSelectBootstrap dadosCategorias={listaDeCategorias.data} />}
            </select>
          </div>

          {/* Autor do artigo */}
          <div className='mb-3'>
            <label htmlFor="author-article" className='form-label'>Autor:</label>
            <select
              required
              className="form-select"
              aria-label="Selecione a categoria do artigo"
              value={articlePost.userId ?? 0}
              disabled={mode === 'remove'}
              onChange={(e) => {
                const authorStringToNumber = Number.parseInt(e.target.value)
                const authorId = Number.isNaN(authorStringToNumber) ? null : authorStringToNumber
                setArticlePost((prevValue) => {
                  return { ...prevValue, userId: authorId }
                })
              }}
            >
              {listaDeAutores.isLoading ?
                (<option value="">Carregando...</option>) :
                <option selected value="">Selecionar o Autor</option>
              }
              {listaDeAutores.isError && <option>Erro ao carregar lista de Autores</option>}
              {listaDeAutores.data && <CaixaSelectBootstrap dadosUsuarios={listaDeAutores.data} />}
            </select>
          </div>

          {/* Agora falta o editor de texto */}
          <div className="mb-3">
            <label htmlFor="author-texteditor" className="form-label">Conteúdo:</label>
            {mode !== 'remove' ? renderTextEditor : null}
          </div>
        </div>

        {mode === 'save' && <button type="submit" className={`btn btn-primary ${false && 'disabled'}`}>Salvar</button>}
        {mode === 'remove' && <button type="submit" className="btn btn-danger">Excluir</button>}
        {mode === 'update' && <button type="submit" className="btn btn-success">Atualizar</button>}
        <button type='reset' onClick={(e) => {
          if (quillState) quillState.root.innerHTML = '';
          setMode('save');
          setArticlePost(voidArticlePost)
        }
        } className="btn btn-secondary ml-2">Cancelar</button>
      </form >

      {/* Tabela que deu trabalho!!! */}
      {listaDeArtigos.isLoading && (<h1>Carregando...</h1>)}
      {listaDeArtigos.isError && <h1>Erro ao carregar lista de usuários</h1>}
      {listaDeArtigos.data &&
        <>
          <BootstrapReactArticlesTable dados={listaDeArtigos.data.data} loadArticles={loadArticles} />

          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${articlePage === 1 ? 'disabled' : ''}`}>
                <button
                  onClick={() => setArticlePage((value) => value - 1)}
                  className="page-link">Anterior</button>
              </li>
              {renderPageLinks()}

              <li className="page-item">
                <button
                  onClick={() => setArticlePage((value) => value + 1)}
                  className={`page-link ${articlePage === (Math.ceil(listaDeArtigos.data.count / listaDeArtigos.data.limit)) ? 'disabled' : ''}`}>Próximo</button>
              </li>
            </ul>
          </nav>
        </>
      }
    </>
  )
}
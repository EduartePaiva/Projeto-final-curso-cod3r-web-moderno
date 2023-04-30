'use client'
import userPostInterface from '@/interfaces/userPostInterface'
import BootstrapUsersReactTable from './BootstrapReactUsersTable'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { getUsers, postUser, removeUser } from './userCrud'
import { toast } from 'react-toastify'
import userInterface from '@/interfaces/userInterface'

const voidUserPost: userPostInterface = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  admin: false,
}



type mode = 'save' | 'remove' | 'update'

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

export default function Usuarios() {
  const [mode, setMode] = useState<mode>('save')
  const [userPost, setUserPost] = useState(voidUserPost)
  const queryClient = useQueryClient()

  const usuarios = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  const addOrUpdateUser = useMutation({
    mutationFn: postUser,
    onSuccess: async (resposta) => {
      const resporta = await resposta.text()
      await queryClient.invalidateQueries({
        queryKey: ['users']
      })
      mostrarNotificacao(resporta, resposta.status)
      setMode('save')
      setUserPost(voidUserPost)

    }
  })

  const deleteUser = useMutation({
    mutationFn: removeUser,
    onSuccess: async (value) => {
      const resporta = await value.text()
      await queryClient.invalidateQueries({ queryKey: ['users'] })
      mostrarNotificacao(resporta, value.status)
      setMode('save')
      setUserPost(voidUserPost)
    }
  })

  function loadUser(mode: mode, user: userInterface) {
    if (mode === 'remove') {
      setMode('remove')
      setUserPost({
        admin: user.admin,
        email: user.email,
        password: '',
        confirmPassword: '',
        name: user.name,
        id: user.id
      })
      toast.warn(`Excluir ${user.name}?`)
    }

    if (mode === 'update') {
      setMode('update')
      setUserPost({
        admin: user.admin,
        email: user.email,
        password: '',
        confirmPassword: '',
        name: user.name,
        id: user.id
      })
      toast.warn(`Atualizar ${user.name}?`)
    }
  }


  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (mode === 'remove') {
          deleteUser.mutate(userPost.id)
        } else {
          addOrUpdateUser.mutate(userPost)
        }

      }}>
        {/* Nome e email */}
        <div className='row'>
          <div className='mb-3 col-md-6'>
            <label htmlFor="user-name" className='form-label '>Nome:</label>
            <input
              disabled={mode === 'remove'}
              type="text"
              className='form-control'
              id='user-name'
              typeof='text'
              value={userPost.name}
              placeholder='Informe o Nome do Usuário...'
              required
              onChange={(e) => setUserPost((prevValue) => ({ ...prevValue, name: e.target.value }))}
            />
          </div>
          <div className='mb-3 col-md-6'>
            <label htmlFor="user-email" className='form-label'>E-mail:</label>
            <input
              disabled={mode === 'remove'}
              value={userPost.email}
              type="email"
              className='form-control'
              id='user-email'
              typeof='text'
              placeholder='Informe o E-mail do Usuário...'
              required
              onChange={(e) => setUserPost((prevValue) => ({ ...prevValue, email: e.target.value }))}
            />
          </div>
        </div>

        {/* Admin? */}

        <div className="form-check mt-3 mb-3">
          <input
            disabled={mode === 'remove'}
            checked={userPost.admin}
            className="form-check-input"
            type="checkbox"
            id="user-admin"
            onChange={(e) => setUserPost((prevValue) => ({ ...prevValue, admin: e.target.checked }))}
          />
          <label className="form-check-label" htmlFor="user-admin">
            Administrador?
          </label>
        </div>

        {/* Senha */}
        <div className='row'>
          <div className='mb-3 col-md-6'>
            <label htmlFor="user-password" className='form-label'>Senha:</label>
            <input
              disabled={mode === 'remove'}
              value={userPost.password}
              type="password"
              className='form-control'
              id='user-password'
              typeof='password'
              placeholder='Informe a Senha do Usuário...'
              required
              onChange={(e) => setUserPost((prevValue) => ({ ...prevValue, password: e.target.value }))}
            />
          </div>
          <div className='mb-3 col-md-6'>
            <label htmlFor="user-confirm-password" className='form-label'>Confirmação de Senha:</label>
            <input
              disabled={mode === 'remove'}
              value={userPost.confirmPassword}
              type="password"
              className='form-control'
              id='user-confirm-password'
              typeof='password'
              placeholder='Confirme a Senha do Usuário...'
              required
              onChange={(e) => setUserPost((prevValue) => ({ ...prevValue, confirmPassword: e.target.value }))}
            />
          </div>
        </div>

        {mode === 'save' && <button type="submit" className={`btn btn-primary ${addOrUpdateUser.isLoading && 'disabled'}`}>Salvar</button>}
        {mode === 'remove' && <button type="submit" className="btn btn-danger">Excluir</button>}
        {mode === 'update' && <button type="submit" className="btn btn-success">Atualizar</button>}
        <button
          type='reset'
          onClick={(e) => {
            setMode('save')
            setUserPost(voidUserPost)
          }}
          className="btn btn-secondary ml-2"

        >
          Cancelar
        </button>

      </form>


      {/* Tabela que deu trabalho!!! */}
      {usuarios.isLoading && (<h1>Carregando...</h1>)}
      {usuarios.isError && <h1>Erro ao carregar lista de usuários</h1>}
      {usuarios.data && <BootstrapUsersReactTable dados={usuarios.data} loadUser={loadUser}></BootstrapUsersReactTable>}
    </>
  )
}
'use client'
import userInterface from '@/interfaces/userInterface'
import BootstrapUsersReactTable from './BootstrapReactUsersTable'
import { useQuery, useMutation } from '@tanstack/react-query'
import { MouseEvent, useRef, useState } from 'react'
import { getUsers } from './usuarioCrud/userCrud'



type mode = 'save' | 'remove'

function reset(e: MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault()

}

export default function Usuarios(props: { visible: boolean }) {
  const [mode, setMode] = useState<mode>('save')


  const usuarios = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })


  console.log('reload')
  return (
    <>
      <form>
        {/* Nome e senha */}
        <div className='row'>
          <div className='mb-3 col-md-6'>
            <label htmlFor="user-name" className='form-label'>Nome:</label>
            <input
              type="text"
              className='form-control'
              id='user-name'
              typeof='text'
              placeholder='Informe o Nome do Usuário...'
              required
            />
          </div>
          <div className='mb-3 col-md-6'>
            <label htmlFor="user-email" className='form-label'>E-mail:</label>
            <input
              type="text"
              className='form-control'
              id='user-email'
              typeof='text'
              placeholder='Informe o E-mail do Usuário...'
              required
            />
          </div>
        </div>

        {/* Admin? */}

        <div className="form-check mt-3 mb-3">
          <input className="form-check-input" type="checkbox" value="" id="user-admin" />
          <label className="form-check-label" htmlFor="user-admin">
            Administrador?
          </label>
        </div>

        {/* Senha */}
        <div className='row'>
          <div className='mb-3 col-md-6'>
            <label htmlFor="user-password" className='form-label'>Senha:</label>
            <input
              type="password"
              className='form-control'
              id='user-password'
              typeof='password'
              placeholder='Informe a Senha do Usuário...'
              required
            />
          </div>
          <div className='mb-3 col-md-6'>
            <label htmlFor="user-confirm-password" className='form-label'>Confirmação de Senha:</label>
            <input
              type="password"
              className='form-control'
              id='user-confirm-password'
              typeof='password'
              placeholder='Confirme a Senha do Usuário...'
              required
            />
          </div>
        </div>

        {mode === 'save' && <button type="submit" className="btn btn-primary">Salvar</button>}
        {mode === 'remove' && <button type="submit" className="btn btn-danger">Excluir</button>}
        <button onClick={(e) => {
          e.preventDefault()
          setMode('save')

        }} className="btn btn-secondary ml-2">Cancelar</button>

      </form>


      {/* Tabela que deu trabalho!!! */}
      {usuarios.isLoading && (<h1>Carregando...</h1>)}
      {usuarios.isError && <h1>Erro ao carregar lista de usuários</h1>}
      {usuarios.data && <BootstrapUsersReactTable dados={usuarios.data}></BootstrapUsersReactTable>}

    </>
  )
}
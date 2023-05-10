'use client'

import { baseApiUrl, showError, userKey } from '@/cruds/global'
import { useState } from 'react'
import style from './auth.module.css'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import { useStore } from '@/store'

function signup() { }
function signin() { }

export default function Auth() {
    const dados = useStore()
    const [showSignup, setShowSignup] = useState(false)
    const [user, setUser] = useState({
        nome: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    console.log(dados)

    return (
        <div className={style['auth-content']}>
            <div>{dados.email}</div>
            <div className={style['auth-modal']}>
                <Image src={logo} width={200} alt='Logo' />
                <hr />

                <div className={style['auth-title']}>{showSignup ? 'Cadastro' : 'Login'}</div>

                {showSignup && <input type="text" onChange={(e) => setUser((prev) => ({ ...prev, nome: e.target.value }))} placeholder='Nome' />}
                <input type="email" placeholder='E-mail' onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} />
                <input type="password" placeholder='Senha' onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} />
                {showSignup && <input type="password" placeholder='Confirme a Senha' onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} />}
                {showSignup ? <button onClick={signup}>Registrar</button> : <button onClick={signin}>Entrar</button>}


                <a onClick={(e) => { e.preventDefault(); setShowSignup(prev => !prev) }}>
                    {showSignup ? <span>Já tem cadastro? Acesse o Login!</span> : <span>Não tem cadastro? Registre-se aqui!</span>}
                </a>
            </div>
        </div>
    )
}

'use client'

import { showMessage, userKey } from '@/cruds/global'
import { Dispatch, SetStateAction, useState } from 'react'
import style from './auth.module.css'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import { useStore } from '@/store'
import { signinCrud, signupCrud } from '@/cruds/authCrud'
import signInInterface from '@/interfaces/signInInterface'
import { useRouter } from 'next/navigation'

interface authUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const voidAuthUser: authUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

//login
async function signin(
    user: authUser,
    setUser: Dispatch<SetStateAction<authUser>>
) {
    const resposta = await signinCrud({ email: user.email, password: user.password })
    const status = resposta.status
    if (status === 200) {
        showMessage('', 200)
        const resData: signInInterface = await resposta.json()
        localStorage.setItem(userKey, JSON.stringify(resData))

        useStore.setState({
            id: resData.id,
            name: resData.name,
            email: resData.email,
            admin: resData.admin
        })

        setUser(voidAuthUser)

        try {
            window.location.reload();
        } catch (e) { }
    } else {
        const resMessage = await resposta.text()
        showMessage(resMessage, status)
    }



}

//cadastrar
async function signup(
    user: authUser,
    setUser: Dispatch<SetStateAction<authUser>>,
    setShowSignup: Dispatch<SetStateAction<boolean>>
) {
    const resposta = await signupCrud(user)
    const status = resposta.status
    if (status === 204) {
        showMessage("Carastro realizado com sucesso!", status)
        setUser(voidAuthUser)
        setShowSignup(false)
    } else {
        const textResposta = await resposta.text()
        showMessage(textResposta, status)
    }
}

export default function Auth() {
    const dados = useStore()
    const [showSignup, setShowSignup] = useState(false)
    const router = useRouter();
    const [user, setUser] = useState<authUser>(voidAuthUser)
    if (dados.id) {
        router.push('/')
    }

    return (
        <div className={style['auth-content']}>
            <div className={style['auth-modal']}>
                <Image src={logo} width={200} alt='Logo' />
                <hr />

                <div className={style['auth-title']}>{showSignup ? 'Cadastro' : 'Login'}</div>

                {showSignup && <input type="text" value={user.name} onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))} placeholder='Nome' />}
                <input type="email" value={user.email} placeholder='E-mail' onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} />
                <input type="password" value={user.password} placeholder='Senha' onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} />
                {showSignup && <input value={user.confirmPassword} type="password" placeholder='Confirme a Senha' onChange={(e) => setUser((prev) => ({ ...prev, confirmPassword: e.target.value }))} />}
                {showSignup ?
                    <button
                        className='hover:bg-blue-900 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'
                        onClick={() => signup(user, setUser, setShowSignup)}>Registrar
                    </button>
                    :
                    <button className='hover:bg-blue-900 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'
                        onClick={() => signin(user, setUser)}>Entrar
                    </button>
                }


                <a onClick={(e) => { e.preventDefault(); setShowSignup(prev => !prev) }}>
                    {showSignup ? <span>Já tem cadastro? Acesse o Login!</span> : <span>Não tem cadastro? Registre-se aqui!</span>}
                </a>
            </div>
        </div>
    )
}

'use client'

import '@/styles/globals.css'
import style from '@/styles/Content.module.css'
//Importando toastify para notificações
import 'react-toastify/dist/ReactToastify.css'
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */
import { useState } from 'react'

//text editor css
import 'quill/dist/quill.snow.css'

import Header from './component.Header'
import Menu from './component.Menu'
import Footer from './component.Footer'
import userInterface from '@/interfaces/userInterface'
import Provireds from './Providers';
import { ToastContainer } from 'react-toastify'


export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user: userInterface = {
        name: 'Eduarte Paiva',
        email: 'eduarte@gmail.com',
        admin: true,
        id: 1
    }

    //state e função que realiza a ocultação do menu
    const [ocultarMenu, setOcultarMenu] = useState(false)
    function toggleClicked() {
        setOcultarMenu(!ocultarMenu)
    }
    //-----------------------------------


    return (
        <html lang="pt-br">
            <head>
                <title>Base De Conhecimento</title>
                {/* Fonte Lato da google */}
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link href='https://fonts.googleapis.com/css?family=Lato&display=optional' rel='stylesheet' />
                {/* Bootstrap css versão 5.3-alpha3 */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>
            </head>

            <body className={`app ${ocultarMenu ? 'grid-template-sem-menu' : 'grid-template-com-menu'}`}>
                <Provireds>
                    <Header user={user} setToggle={toggleClicked} iconeMenuAberto={ocultarMenu} title='Cod3r - Base de Conhecimento'></Header>
                    <Menu></Menu>
                    <div className={style.content} >
                        {/* Carrega a homepage aqui */}
                        {children}
                    </div>
                    <Footer></Footer>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </Provireds>
            </body>
        </html>
    )
}

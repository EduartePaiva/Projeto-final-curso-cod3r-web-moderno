import { Inter } from 'next/font/google'

import Header from '@/components/template/Header'
import Footer from '@/components/template/Footer'
import Menu from '@/components/template/Menu'
import Content from '@/components/template/Content'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [ocultarMenu, setOcultarMenu] = useState(false)


  function toggleClicked() {
    if (!ocultarMenu) {
      setOcultarMenu(true)
    } else {
      setOcultarMenu(false)
    }
  }


  return (
    <div className={`app ${ocultarMenu ? 'grid-template-sem-menu' : 'grid-template-com-menu'}`}>
      <Header setToggle={toggleClicked} iconeMenuAberto={ocultarMenu} title='Cod3r - Base de Conhecimento'></Header>
      {ocultarMenu ? null : (<Menu></Menu>)}
      <Content></Content>
      <Footer></Footer>
    </div>
  )
}

import Link from "next/link";

interface navs {
    navAtiva:
    'article' |
    'category' |
    'usuario' |
    'teste' |
    ''
}

export default function NavLinks(props: navs) {
    return (
        <nav className='nav nav-tabs'>
            <Link href={'../admin/article'} className={`nav-link ${props.navAtiva === 'article' ? 'active' : ''}`}>Artigos</Link>
            <Link href={'../admin/category'} className={`nav-link ${props.navAtiva === 'category' ? 'active' : ''}`}>Categorias </Link>
            <Link href={'../admin/usuario'} className={`nav-link ${props.navAtiva === 'usuario' ? 'active' : ''}`}>Usuários</Link>
            <Link href={'./admin/teste'} className={`nav-link ${props.navAtiva === 'teste' ? 'active' : ''}`}>Teste</Link>
        </nav>
    )
}
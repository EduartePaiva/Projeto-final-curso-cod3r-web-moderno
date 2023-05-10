import style from '@/styles/Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import UserDropdown from './UserDropdown'
import userInterface from '@/interfaces/userInterface'
import Link from 'next/link'


interface props {
    title: string,
    iconeMenuAberto: boolean,
    setToggle: Function,
    user?: userInterface
}

export default function Header(props: props) {
    return (
        <header className={style.header}>

            {/* Link do toggle do header */}
            {props.user && (
                <a onClick={() => props.setToggle()} className={style.toggle}>
                    <FontAwesomeIcon icon={props.iconeMenuAberto ? faAngleDown : faAngleLeft} size='lg'></FontAwesomeIcon>
                </a>
            )}

            {/* Título, parte central  */}
            <h1 className={style.title}>
                <Link href={'/home'}>
                    {props.title}
                </Link>
            </h1>

            {/* o dropdown do usuário */}
            {props.user && <UserDropdown {...props.user}></UserDropdown>}

        </header>
    )
}
import style from '@/styles/UserDropdown.module.css'
import Gravatar from './Gravatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCogs, faSignOut } from '@fortawesome/free-solid-svg-icons'
import userInterface from '@/interfaces/userInterface'
import Link from 'next/link'



export default function UserDropdown(props: userInterface) {
    return (
        <div className={style['user-dropdown']}>
            <div className={style['user-button']}>
                <span className='d-none d-sm-block'>{props.name}</span>
                <div className={style['user-dropdown-img']}>
                    <Gravatar email={props.email}></Gravatar>
                </div>
                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
            </div>
            <div className={style['user-dropdown-content']}>
                <Link href={'/admin'}><FontAwesomeIcon icon={faCogs}></FontAwesomeIcon> Administração</Link>
                <a href=""><FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon> Sair</a>
            </div>
        </div>
    )
}
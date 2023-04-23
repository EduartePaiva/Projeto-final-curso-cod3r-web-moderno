import style from '@/styles/Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition, IconProp, icon } from '@fortawesome/fontawesome-svg-core'
import { Dispatch, SetStateAction, useState } from 'react'


interface props {
    title: string,
    hideToggle?: boolean,
    iconeMenuAberto: boolean,
    setToggle: Function
}

export default function Header(props: props) {
    return (
        <header className={style.header}>
            {!props.hideToggle ? (
                <a onClick={() => props.setToggle()} className={style.toggle}>
                    <FontAwesomeIcon icon={props.iconeMenuAberto ? faAngleRight : faAngleLeft} size='lg'></FontAwesomeIcon>
                </a>
            ) : null}
            <h1 className={style.title}>
                {props.title}
            </h1>
        </header>
    )
}
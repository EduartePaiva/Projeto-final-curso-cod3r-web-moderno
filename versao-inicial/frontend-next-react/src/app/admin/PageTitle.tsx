import style from '@/styles/PageTitle.module.css'
import { IconProp, icon } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface pageTitleProps {
    main: string
    icon?: IconProp
    sub: string
}


export default function PageTitle(props: pageTitleProps) {
    return (
        <div className={style['page-title']}>
            <h1>{props.icon && <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>} {props.main}</h1>
            <h2>{props.sub}</h2>
            <hr />
        </div>
    )
}
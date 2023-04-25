import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './page.module.css'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface statProps {
    title: string,
    value: number,
    icon: IconProp,
    color?: string
}

export default function Stat(props: statProps) {
    return (
        <div className={style['stat']}>
            <div className={style['stat-icon']}>
                <FontAwesomeIcon color={props.color ?? '#000'} size={'5x'} icon={props.icon}></FontAwesomeIcon>
            </div>
            <div className={style['stat-info']}>
                <span className={style['stat-title']}>{props.title}</span>
                <span className={style['stat-value']}>{props.value}</span>
            </div>
        </div>
    )
}
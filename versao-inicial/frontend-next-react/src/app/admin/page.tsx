import Link from "next/link";
import style from './adminPageTabs.module.scss'
import NavLinks from "./NavLinks";

export default function AdminPages() {
    return (
        <div className={style['nav-tab']}>
            <NavLinks navAtiva=""></NavLinks>

            <div className={`${style['tab-content']} p-3 bg-white category-admin`}>
                <h1>Escolha uma opção</h1>
            </div>
        </div >
    )
}
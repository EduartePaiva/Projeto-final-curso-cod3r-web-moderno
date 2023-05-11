'use client'
import { useStore } from "@/store";
import PageTitle from "./PageTitle";
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const userData = useStore()

    if (userData.admin) {
        return (
            <div className="admin-pages">
                <PageTitle main="Administração do Sistema" sub="Cadastros & Cia" icon={faCogs} />
                {children}

            </div>
        )
    } else {
        return (
            <div>
                <span>Página não autorizada!! </span>
                <Link href={'/'}>volte para a home page</Link>
            </div>
        )
    }
}
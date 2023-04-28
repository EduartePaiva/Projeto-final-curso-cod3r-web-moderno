import NavLinks from "../NavLinks"

interface usuariosLayoutProps {
    children: React.ReactNode
}

export default function usuarioLayout({ children }: usuariosLayoutProps) {
    return (
        <div>
            <NavLinks navAtiva='usuario' />
            <div className='tab-content p-3 bg-white user-admin'>
                {children}
            </div>
        </div>
    )

}
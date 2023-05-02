import articleInterface from "@/interfaces/articleInterface";
import categoryInterface from "@/interfaces/categoryInterface";
import userInterface from "@/interfaces/userInterface";

interface caixaSelectBootstrapProps {
    dadosArtigos?: articleInterface[],
    dadosUsuarios?: userInterface[],
    dadosCategorias?: categoryInterface[]
}

export default function CaixaSelectBootstrap(props: caixaSelectBootstrapProps) {



    return (
        <>
            {/* Os options serão renderizados de acordo com os dados */}

            {props.dadosCategorias?.map((category) => {
                return <option key={category.id} value={category.id}>{category.path}</option>
            })}

            {props.dadosUsuarios?.map((user) => {
                return <option key={user.id} value={user.id}>{`${user.name} - ${user.email}`}</option>
            })}
        </>
    )

}
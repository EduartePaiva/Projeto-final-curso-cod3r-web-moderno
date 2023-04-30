import categoryInterface from "@/interfaces/categoryInterface";

interface caixaSelectBootstrapProps {
    dados: categoryInterface[]
}

export default function CaixaSelectBootstrap(props: caixaSelectBootstrapProps) {

    return (
        <>
            {/* Os options serão renderizados de acordo com os dados */ false}
            {props.dados.map((categoria) => {
                return <option key={categoria.id} value={categoria.id}>{categoria.path}</option>
            })}
        </>
    )

}
import { toast } from "react-toastify"

export const baseApiUrl = 'http://localhost:3000'
export const userKey = '__knowledge_user'



export function showError(mensagem: string, codigo: number) {
    switch (codigo) {
        case 204:
            toast.success('Operação realizada com sucesso!!')
            break;
        case 500:
            toast.error(`😵 Erro no servidor: ${mensagem}`)
            break;
        case 400:
            toast.warn(`🤔 ${mensagem}`)
            break;
        default:
            toast(`${codigo}`)
            break;

    }
}



export default { baseApiUrl, userKey, showError }
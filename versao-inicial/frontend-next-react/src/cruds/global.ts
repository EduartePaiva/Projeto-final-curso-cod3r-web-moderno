import { toast } from "react-toastify"

const baseApiUrl = 'http://localhost:3000'
const userKey = '__knowledge_user'


/** Caso o código seja 200 responde: 'Operação realizada com sucesso'. Senão responderá um erro com a 'mensagem' informada */
function showMessage(mensagem: string, codigo: number) {
    switch (codigo) {
        case 204:
            toast.success(mensagem)
            break;
        case 200:
            toast.success('Operação realizada com sucesso!!')
            break;
        default:
            toast.error(mensagem)
            break;

    }
}



export { baseApiUrl, userKey, showMessage }
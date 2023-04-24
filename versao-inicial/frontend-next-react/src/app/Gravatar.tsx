import Image from 'next/image'
import gravatar_pic from '@/assets/gravatar_pic.png'

interface propsGravatar {
    email: string
    src?: {
        width: number,
        height: number,
        link: string
    }
}

export default function Gravatar(props: propsGravatar) {
    return (
        <Image
            src={gravatar_pic}
            alt='Imagem do avatar'
            width={37}
            height={37}
        />
    )
}
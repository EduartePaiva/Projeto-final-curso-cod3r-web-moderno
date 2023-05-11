import gifLoading from '@/assets/loading.gif'
import Image from 'next/image'

export default function Loading() {
    return (
        <div className="flex justify-center items-center">
            <Image src={gifLoading} alt='loading' />
        </div>
    )
}

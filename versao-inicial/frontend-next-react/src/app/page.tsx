'use client'
import { useStore } from '@/store'
import HomePage from './home/page'
import Loading from '@/components/template/Loading'
// A primeira página será o componente Content

// `app/page.js` is the UI for the root `/` URL



export default function Page() {
    const userData = useStore()

    return (
        userData.id ? < HomePage /> : <Loading />
    )
}

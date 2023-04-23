import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Base De Conhecimento</title>
                <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' />
            </Head>
            <Component {...pageProps} />
        </>

    )

}

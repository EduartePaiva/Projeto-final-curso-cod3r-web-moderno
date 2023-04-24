import HomePage from './home/page'
// A primeira página será o componente Content

// `app/page.js` is the UI for the root `/` URL
export default function Page() {

    return (
        <>
            {/* @ts-expect-error Async Server Component */}
            < HomePage />
        </>
    )
}

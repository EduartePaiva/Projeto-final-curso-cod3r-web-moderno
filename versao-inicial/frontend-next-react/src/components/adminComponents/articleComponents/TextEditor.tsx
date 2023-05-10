'use client'

import Quill from 'quill'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'video', 'blockquote', 'code-block'],
    ['clean'],
]

interface textEditorProps {
    setQuillState: Dispatch<SetStateAction<Quill | undefined>>
}
export default function TextEditor({ setQuillState }: textEditorProps) {
    const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
        setQuillState(q)
    }, [setQuillState])


    return (
        <div className='containerQuill' ref={wrapperRef}></div>
    )


}

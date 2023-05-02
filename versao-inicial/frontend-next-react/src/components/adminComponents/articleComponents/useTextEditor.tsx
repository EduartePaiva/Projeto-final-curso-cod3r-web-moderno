'use client'

import Quill from 'quill'
import { useCallback, useState } from 'react'

const SAVE_INTERVAL_MS = 2000
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

export default function useTextEditor() {
    const [quillState, setQuillState] = useState<Quill>()
    const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
        setQuillState(q)
    }, [])
    return {
        quillState,
        renderTextEditor: (
            <div className='containerQuill' ref={wrapperRef}>
            </div>
        )
    }
}

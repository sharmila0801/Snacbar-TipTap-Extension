import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { addSnackbar } from './SnackbarHelper'
import { Snackbar } from './SnackBar'

 const TiptapEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Snackbar.configure({
        HTMLAttributes: { class: 'custom-snackbar' },
      }),
    ],
  })

  const handleAddSuccess = () => {
    if (editor) {
      addSnackbar(editor, 'Operation Successful!', 'success',3000)
    }
  }

  const handleAddError = () => {
    if (editor) {
      addSnackbar(editor, 'Operation Failed!', 'error',3000)
    }
  }

  return (
    <div>
      <div>
        <EditorContent editor={editor} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleAddSuccess} style={{ marginRight: '10px' }}>
          Add Success Snackbar
        </button>
        <button onClick={handleAddError}>Add Error Snackbar</button>
      </div>
    </div>
  )
}

export default TiptapEditor
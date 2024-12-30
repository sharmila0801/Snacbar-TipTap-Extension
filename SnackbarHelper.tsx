import { Editor } from '@tiptap/react'

export const addSnackbar = (
  editor: Editor,
  message: string,
  type: 'success' | 'error',
  duration = 3000
) => {
  const nodeType = editor.schema.nodes.snackbar
  if (!nodeType) {
    console.error('Snackbar node is not defined in the schema.')
    return false
  }

  // Insert the snackbar node and track the position
  const { tr, selection } = editor.state
  const from = selection.from
  const content = editor.schema.text(message)
  const snackbarNode = nodeType.create({ type }, content)
  const to = from + snackbarNode.nodeSize

  tr.insert(from, snackbarNode)
  editor.view.dispatch(tr)

  // Remove the snackbar node after the specified duration
  setTimeout(() => {
    editor.commands.deleteRange({ from, to })
  }, duration)

  return true
}

import { Node, mergeAttributes } from '@tiptap/core'

export const Snackbar = Node.create({
  name: 'snackbar',

  group: 'block',

  content: 'text*',

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'snackbar',
      },
    }
  },

  addAttributes() {
    return {
      type: {
        default: 'success', // Default to 'success'
        parseHTML: (element) => element.getAttribute('data-type') || 'success',
        renderHTML: (attributes) => {
          return { 'data-type': attributes.type }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div.snackbar',
        getAttrs: (element) => ({
          type: element.getAttribute('data-type'),
        }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    // Dynamically assign the class based on the 'type' attribute
    const typeClass = HTMLAttributes['data-type'] === 'error' ? 'snackbar-error' : 'snackbar-success'
    const mergedAttributes = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
      class: `snackbar ${typeClass}`,
    })

    // Return the correct HTML structure with dynamic classes
    return ['div', mergedAttributes, 0]
  },
})

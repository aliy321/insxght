import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export function extractTextFromLexical(
  richText: DefaultTypedEditorState | null | undefined,
): string {
  if (!richText?.root?.children) {
    return ''
  }

  const extractTextFromNode = (node: string | { text?: string; children?: unknown[] }): string => {
    if (typeof node === 'string') {
      return node
    }

    if (node?.text) {
      return node.text
    }

    if (node?.children && Array.isArray(node.children)) {
      return (node.children as (string | { text?: string; children?: unknown[] })[])
        .map(extractTextFromNode)
        .join(' ')
    }

    return ''
  }

  return richText.root.children.map(extractTextFromNode).join(' ').trim()
}

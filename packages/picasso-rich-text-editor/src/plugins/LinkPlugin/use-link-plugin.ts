import type { LinkNode } from '@lexical/link'
import { $createLinkNode, $isLinkNode, toggleLink } from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import type { NodeKey, RangeSelection } from 'lexical'
import {
  $createTextNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $setSelection,
} from 'lexical'
import { useCallback, useRef, useState } from 'react'

import { getSelectedNode } from '../../LexicalEditor/utils/get-selected-node'
import type { LinkValues } from './LinkPluginModal'
import { sanitizeUrl } from './utils/url'

const EMPTY_VALUES: LinkValues = { text: '', url: '', openInNewTab: false }

const linkAttributes = (openInNewTab: boolean) =>
  openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : { target: null, rel: 'noreferrer' }

const $getEditedLink = (key: NodeKey | null): LinkNode | null => {
  const node = key ? $getNodeByKey(key) : null

  return $isLinkNode(node) ? node : null
}

type LinkSpec = {
  href: string
  attributes: ReturnType<typeof linkAttributes>
  label: string
}

const $updateLink = (link: LinkNode, { href, attributes, label }: LinkSpec) => {
  link.setURL(href)
  link.setTarget(attributes.target)
  link.setRel(attributes.rel)

  if (label === link.getTextContent()) {
    return
  }

  const oldChildren = link.getChildren()
  const textNode = $createTextNode(label)

  // Append before removing: a link left without children removes itself
  link.append(textNode)
  oldChildren.forEach(child => child.remove())
  textNode.select()
}

const $insertLink = (
  selection: RangeSelection,
  { href, attributes, label }: LinkSpec
) => {
  $setSelection(selection)

  // Keep the selection's formatting when only a URL is attached to it
  if (!selection.isCollapsed() && label === selection.getTextContent()) {
    toggleLink(href, attributes)

    return
  }

  // Inserting a text node first and then swapping it for the link is the
  // only reliable way to place a link at the selection
  selection.insertNodes([$createTextNode(label)])
  const placeholder = getSelectedNode(selection)
  const linkNode = $createLinkNode(href, attributes)

  linkNode.append($createTextNode(label))
  placeholder.replace(linkNode)
}

export const useLinkPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [initialValues, setInitialValues] = useState(EMPTY_VALUES)
  // The dialog takes focus from the editor, so the selection it applies to is
  // captured on open and restored on save.
  const selectionRef = useRef<RangeSelection | null>(null)
  const linkKeyRef = useRef<NodeKey | null>(null)

  const open = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection()

      if (!$isRangeSelection(selection)) {
        return
      }

      const node = getSelectedNode(selection)
      const parent = node.getParent()
      const link = $isLinkNode(node)
        ? node
        : $isLinkNode(parent)
        ? parent
        : null

      selectionRef.current = selection.clone()
      linkKeyRef.current = link ? link.getKey() : null
      setEditing(Boolean(link))
      setInitialValues(
        link
          ? {
              text: link.getTextContent(),
              url: link.getURL(),
              openInNewTab: link.getTarget() === '_blank',
            }
          : { ...EMPTY_VALUES, text: selection.getTextContent() }
      )
      setIsOpen(true)
    })
  }, [editor])

  const close = useCallback(() => setIsOpen(false), [])

  const submit = useCallback(
    ({ text, url, openInNewTab }: LinkValues) => {
      editor.update(() => {
        const href = sanitizeUrl(url)
        const spec = {
          href,
          attributes: linkAttributes(openInNewTab),
          label: text || href,
        }
        const link = $getEditedLink(linkKeyRef.current)
        const selection = selectionRef.current?.clone()

        if (link) {
          $updateLink(link, spec)
        } else if (selection) {
          $insertLink(selection, spec)
        }
      })
      setIsOpen(false)
    },
    [editor]
  )

  const remove = useCallback(() => {
    editor.update(() => {
      const link = $getEditedLink(linkKeyRef.current)

      if (link) {
        link.getChildren().forEach(child => link.insertBefore(child))
        link.remove()
      }
    })
    setIsOpen(false)
  }, [editor])

  return { isOpen, editing, initialValues, open, close, submit, remove }
}

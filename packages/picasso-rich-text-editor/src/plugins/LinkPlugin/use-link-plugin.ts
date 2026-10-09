import type { LinkNode } from '@lexical/link'
import { $createLinkNode, $isLinkNode, toggleLink } from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $findMatchingParent } from '@lexical/utils'
import type { LexicalNode, NodeKey, RangeSelection } from 'lexical'
import {
  $createTextNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $setSelection,
} from 'lexical'
import { useCallback, useEffect, useRef, useState } from 'react'

import { getSelectedNode } from '../../LexicalEditor/utils/get-selected-node'
import type { LinkValues } from './LinkPluginModal'
import { sanitizeUrl } from './utils/url'

const linkAttributes = (openInNewTab: boolean) =>
  openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : { target: null, rel: 'noreferrer' }

const $getEditedLink = (key: NodeKey | null): LinkNode | null => {
  const node = key ? $getNodeByKey(key) : null

  return $isLinkNode(node) ? node : null
}

const $getLinkAt = (node: LexicalNode): LinkNode | null => {
  const link = $findMatchingParent(node, $isLinkNode)

  return $isLinkNode(link) ? link : null
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

type Options = {
  defaultTarget: '_self' | '_blank'
}

export const useLinkPlugin = ({ defaultTarget }: Options) => {
  const [editor] = useLexicalComposerContext()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const emptyValues: LinkValues = {
    text: '',
    url: '',
    openInNewTab: defaultTarget === '_blank',
  }
  const [initialValues, setInitialValues] = useState(emptyValues)
  // The dialog takes focus from the editor, so the selection it applies to is
  // captured on show and restored when it closes.
  const selectionRef = useRef<RangeSelection | null>(null)
  const linkKeyRef = useRef<NodeKey | null>(null)
  const wasOpenRef = useRef(false)

  // Return focus to the editor once the dialog is gone; focusing it while the
  // dialog is still mounted would be pulled back into the dialog
  useEffect(() => {
    if (wasOpenRef.current && !open) {
      editor.focus()
    }
    wasOpenRef.current = open
  }, [editor, open])

  const show = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection()

      if (!$isRangeSelection(selection)) {
        return
      }

      // Either end of the selection can sit in a link, e.g. a selection that
      // starts inside one and ends after it
      const link =
        $getLinkAt(selection.anchor.getNode()) ??
        $getLinkAt(selection.focus.getNode())

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
          : {
              text: selection.getTextContent(),
              url: '',
              openInNewTab: defaultTarget === '_blank',
            }
      )
      setOpen(true)
    })
  }, [editor, defaultTarget])

  const close = useCallback(() => {
    editor.update(() => {
      const selection = selectionRef.current?.clone()

      if (selection) {
        $setSelection(selection)
      }
    })
    setOpen(false)
  }, [editor])

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
      setOpen(false)
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
    setOpen(false)
  }, [editor])

  return { open, editing, initialValues, show, close, submit, remove }
}

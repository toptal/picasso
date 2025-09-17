import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical'

import TextLengthPlugin from './TextLengthPlugin'

const createEditor = (initialText = '') => {
  const initialConfig = {
    namespace: 'test',
    theme: {},
    onError: () => {},
    editorState: () => {
      const root = $getRoot()

      if (initialText) {
        const paragraph = $createParagraphNode()
        const textNode = $createTextNode(initialText)

        paragraph.append(textNode)
        root.append(paragraph)
      }
    },
  }

  return initialConfig
}

describe('TextLengthPlugin', () => {
  it('calls onTextLengthChange with initial text length on mount', () => {
    const onTextLengthChange = jest.fn()
    const initialText = 'Hello world'
    const editorConfig = createEditor(initialText)

    render(
      <LexicalComposer initialConfig={editorConfig}>
        <TextLengthPlugin onTextLengthChange={onTextLengthChange} />
      </LexicalComposer>
    )

    expect(onTextLengthChange).toHaveBeenCalledWith(initialText.length)
  })

  it('calls onTextLengthChange with 0 when no initial text', () => {
    const onTextLengthChange = jest.fn()
    const editorConfig = createEditor()

    render(
      <LexicalComposer initialConfig={editorConfig}>
        <TextLengthPlugin onTextLengthChange={onTextLengthChange} />
      </LexicalComposer>
    )

    expect(onTextLengthChange).toHaveBeenCalledWith(0)
  })

  it('calls onTextLengthChange with correct length for multi-line text', () => {
    const onTextLengthChange = jest.fn()
    const initialText = 'First line\nSecond line'
    const editorConfig = createEditor(initialText)

    render(
      <LexicalComposer initialConfig={editorConfig}>
        <TextLengthPlugin onTextLengthChange={onTextLengthChange} />
      </LexicalComposer>
    )

    expect(onTextLengthChange).toHaveBeenCalledWith(initialText.length)
  })
})

import React from 'react'
import { render, waitFor } from '@toptal/picasso/test-utils'

import LazyLexicalEditor from './LazyLexicalEditor'

jest.mock('../LexicalEditor', () => ({
  __esModule: true,
  default: () => <div>LexicalEditor</div>,
}))

jest.mock('../LexicalEditorView', () => ({
  __esModule: true,
  default: () => <div>LexicalEditorView</div>,
}))

describe('LazyLexicalEditor', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when LazyLexicalEditor is rendered', () => {
    it('displays QuillEditorView while LexicalEditor is loading', () => {
      const { getByText, queryByText } = render(<LazyLexicalEditor id='id' />)

      expect(getByText('LexicalEditorView')).toBeInTheDocument()
      expect(queryByText('LexicalEditor')).not.toBeInTheDocument()
    })

    it('displays LexicalEditor after it has loaded', async () => {
      const { queryByText, queryByTestId } = render(
        <LazyLexicalEditor
          id='editor-container-id'
          testIds={{ editor: 'editor-id' }}
        />
      )

      await waitFor(() =>
        expect(queryByTestId('editor-id')).toBeInTheDocument()
      )

      expect(queryByText('LexicalEditorView')).not.toBeInTheDocument()
    })
  })
})

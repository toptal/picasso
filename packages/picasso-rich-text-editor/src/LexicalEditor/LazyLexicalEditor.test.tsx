import React from 'react'
import { render, waitFor } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import LazyLexicalEditor from './LazyLexicalEditor'
import type { Props } from './LexicalEditor'

jest.mock('../LexicalEditor', () => ({
  __esModule: true,
  default: () => <div>LexicalEditor</div>,
}))

jest.mock('../LexicalEditorView', () => ({
  __esModule: true,
  default: () => <div>LexicalEditorView</div>,
}))

const onTextLengthChange = jest.fn()

const renderLazyLexicalEditor = (
  props: Partial<OmitInternalProps<Props>> = {}
) => {
  return render(
    <LazyLexicalEditor
      id='id'
      onTextLengthChange={onTextLengthChange}
      {...props}
    />
  )
}

describe('LazyLexicalEditor', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when LazyLexicalEditor is rendered', () => {
    it('displays LexicalEditorView while LexicalEditor is loading', () => {
      const { getByText, queryByText } = renderLazyLexicalEditor()

      expect(getByText('LexicalEditorView')).toBeInTheDocument()
      expect(queryByText('LexicalEditor')).not.toBeInTheDocument()
    })

    it('displays LexicalEditor after it has loaded', async () => {
      const { queryByText, queryByTestId } = renderLazyLexicalEditor({
        testIds: { editor: 'editor-id' },
      })

      await waitFor(() =>
        expect(queryByTestId('editor-id')).toBeInTheDocument()
      )

      expect(queryByText('LexicalEditorView')).not.toBeInTheDocument()
    })
  })
})

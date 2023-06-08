import React from 'react'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { render } from '@toptal/picasso/test-utils'

import RichTextEditor from './RichTextEditor'
import type { Props } from './RichTextEditor'
import LexicalEditor from '../LexicalEditor'

jest.mock('../utils/use-deprecation-warnings', () => ({
  usePropDeprecationWarning: jest.fn(),
}))
jest.mock('../LexicalEditor', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div>Mocked LexicalEditor</div>),
  }
})

const mockedLexicalEditor = LexicalEditor as jest.MockedFunction<
  typeof LexicalEditor
>

const renderRichTextEditor = (props?: Partial<OmitInternalProps<Props>>) =>
  render(
    <RichTextEditor
      id='test-editor'
      placeholder='placeholder+1'
      testIds={{ wrapper: 'wrapper-test-id-1' }}
      {...props}
    />
  )

describe('RichTextEditor', () => {
  beforeEach(() => {
    mockedLexicalEditor.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders enabled RichTextEditor', () => {
    renderRichTextEditor()

    expect(mockedLexicalEditor).toHaveBeenCalledWith(
      {
        disabled: false,
        id: 'test-editor',
        onChange: expect.any(Function),
        placeholder: 'placeholder+1',
        testIds: {
          wrapper: 'wrapper-test-id-1',
        },
      },
      {}
    )
  })

  describe('when disabled prop is true', () => {
    it('renders disabled RichTextEditor', () => {
      renderRichTextEditor({ disabled: true })

      expect(mockedLexicalEditor).toHaveBeenCalledWith(
        {
          disabled: true,
          id: 'test-editor',
          onChange: expect.any(Function),
          placeholder: 'placeholder+1',
          testIds: {
            wrapper: 'wrapper-test-id-1',
          },
        },
        {}
      )
    })
  })
})

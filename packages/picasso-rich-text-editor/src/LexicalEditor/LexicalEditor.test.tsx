import React from 'react'
import { render, waitFor } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import type { LexicalComposerContextWithEditor } from '@lexical/react/LexicalComposerContext'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import LexicalEditor from './LexicalEditor'
import type { Props } from './LexicalEditor'
import {
  TextLengthPlugin,
  HeadingsReplacementPlugin,
  ListPlugin,
  LinkPlugin,
} from '../plugins'
import ToolbarPlugin from '../LexicalEditorToolbarPlugin'

jest.mock('../LexicalEditorToolbarPlugin', () => ({
  __esModule: true,
  default: jest.fn(() => <div>LexicalEditorToolbarPlugin</div>),
}))

jest.mock('@lexical/react/LexicalComposerContext', () => ({
  __esModule: true,
  useLexicalComposerContext: jest.fn(() => [{}]),
}))
jest.mock('../plugins', () => ({
  __esModule: true,
  ListPlugin: jest.fn(),
  EmojiPlugin: jest.fn(),
  TextLengthPlugin: jest.fn(),
  HeadingsReplacementPlugin: jest.fn(),
  LinkPlugin: jest.fn(),
  ImagePlugin: jest.fn(),
}))

jest.mock('@lexical/react/LexicalHistoryPlugin', () => ({
  __esModule: true,
  HistoryPlugin: jest.fn(() => [{}]),
}))

jest.mock('@lexical/react/LexicalRichTextPlugin', () => ({
  __esModule: true,
  RichTextPlugin: () => <div>RichTextPlugin</div>,
}))

jest.mock('@lexical/react/LexicalComposer', () => ({
  __esModule: true,
  LexicalComposer: ({ children }: any) => <div>{children}</div>,
}))

jest.mock('@lexical/react/LexicalOnChangePlugin', () => ({
  __esModule: true,
  OnChangePlugin: jest.fn(() => <div>OnChangePlugin</div>),
}))

const mockedUseLexicalComposerContext =
  useLexicalComposerContext as jest.MockedFunction<
    typeof useLexicalComposerContext
  >

const mockedLexicalTextLengthPlugin = TextLengthPlugin as jest.MockedFunction<
  typeof TextLengthPlugin
>

const mockedHistoryPlugin = HistoryPlugin as jest.MockedFunction<
  typeof HistoryPlugin
>

const mockedLexicalHeadingsReplacementPlugin =
  HeadingsReplacementPlugin as jest.MockedFunction<
    typeof HeadingsReplacementPlugin
  >

const mockedLexicalLinkPlugin = LinkPlugin as jest.MockedFunction<
  typeof LinkPlugin
>

const mockedToolbarPlugin = ToolbarPlugin as jest.MockedFunction<
  typeof ToolbarPlugin
>
const mockedLexicalListPlugin = ListPlugin as jest.MockedFunction<
  typeof ListPlugin
>
const mockedOnChangePlugin = OnChangePlugin as jest.MockedFunction<
  typeof OnChangePlugin
>

const onTextLengthChange = jest.fn()

const renderLexicalEditor = (props: Partial<OmitInternalProps<Props>> = {}) => {
  return render(
    <LexicalEditor id='id' onTextLengthChange={onTextLengthChange} {...props} />
  )
}

describe('LexicalEditor', () => {
  beforeEach(() => {
    mockedLexicalTextLengthPlugin.mockImplementation(() => null)
    mockedLexicalHeadingsReplacementPlugin.mockImplementation(() => null)
    mockedToolbarPlugin.mockImplementation(() => (
      <div>LexicalEditorToolbarPlugin</div>
    ))
    mockedOnChangePlugin.mockImplementation(() => null)
    mockedLexicalListPlugin.mockImplementation(() => <div />)
    mockedLexicalLinkPlugin.mockImplementation(() => <div />)
    mockedUseLexicalComposerContext.mockImplementation(
      () =>
        [
          {
            registerUpdateListener: jest.fn(() => () => {}),
            registerCommand: jest.fn(() => () => {}),
          },
        ] as unknown as LexicalComposerContextWithEditor
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when LexicalEditor is rendered', () => {
    it('displays Editor core parts', async () => {
      const { getByText } = renderLexicalEditor()

      expect(getByText('RichTextPlugin')).toBeInTheDocument()
    })

    it('renders LexicalTextLengthPlugin with correct props', async () => {
      renderLexicalEditor()

      await waitFor(() =>
        expect(mockedLexicalTextLengthPlugin).toHaveBeenCalledWith(
          {
            onTextLengthChange,
          },
          {}
        )
      )
    })

    it('renders LexicalHeadingsReplacementPlugin', async () => {
      renderLexicalEditor()

      await waitFor(() =>
        expect(mockedLexicalHeadingsReplacementPlugin).toHaveBeenCalled()
      )
    })

    it('renders HistoryPlugin', async () => {
      renderLexicalEditor()

      await waitFor(() => expect(mockedHistoryPlugin).toHaveBeenCalled())
    })

    it('renders OnChangePlugin with correct props', () => {
      renderLexicalEditor()

      expect(mockedOnChangePlugin).toHaveBeenCalledWith(
        {
          ignoreSelectionChange: true,
          onChange: expect.any(Function),
        },
        {}
      )
    })

    it('renders ToolbarPlugin with correct props', () => {
      renderLexicalEditor()

      expect(mockedToolbarPlugin).toHaveBeenCalledWith(
        {
          id: 'id',
          toolbarRef: {
            current: null,
          },
        },
        {}
      )
    })
  })

  describe('when customEmojis and plugins prop is passed', () => {
    it('renders ToolbarPlugin with correct props', () => {
      renderLexicalEditor({
        customEmojis: ['foo' as any],
        plugins: ['link'],
      })

      expect(mockedToolbarPlugin).toHaveBeenCalledWith(
        {
          id: 'id',
          toolbarRef: {
            current: null,
          },
        },
        {}
      )
    })
  })
})

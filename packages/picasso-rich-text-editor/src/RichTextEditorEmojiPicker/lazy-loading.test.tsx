import React from 'react'
import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'

import type * as PickerModule from './RichTextEditorEmojiPicker'

// the picker is required inside the tests: a value import here would load
// emoji-mart before `mockLoad` exists, if a regression imported it eagerly
const mockLoad = jest.fn()

jest.mock('emoji-mart', () => {
  mockLoad('emoji-mart')

  return jest.requireActual('emoji-mart')
})
jest.mock('@emoji-mart/data', () => {
  mockLoad('@emoji-mart/data')

  return jest.requireActual('@emoji-mart/data')
})
// every lazy load fails, as a failed chunk request would
jest.mock('./EmojiMartPicker', () => {
  throw new Error('Loading chunk failed')
})

describe('RichTextEditorEmojiPicker', () => {
  it('keeps emoji-mart and its dataset out of the static imports', () => {
    jest.isolateModules(() => {
      require('../index')
      require('../LexicalEditor/LexicalEditor')
    })

    expect(mockLoad).not.toHaveBeenCalled()

    jest.isolateModules(() => {
      jest.requireActual('./EmojiMartPicker')
    })

    expect(mockLoad).toHaveBeenCalledWith('emoji-mart')
    expect(mockLoad).toHaveBeenCalledWith('@emoji-mart/data')
  })

  it('keeps rendering when emoji-mart fails to load', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()
    const { RichTextEditorEmojiPicker } = jest.requireActual<
      typeof PickerModule
    >('./RichTextEditorEmojiPicker')

    render(<RichTextEditorEmojiPicker onInsertEmoji={jest.fn()} />)

    fireEvent.click(screen.getByRole('button'))
    await act(async () => {})

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(document.querySelector('em-emoji-picker')).not.toBeInTheDocument()

    consoleError.mockRestore()
  })
})

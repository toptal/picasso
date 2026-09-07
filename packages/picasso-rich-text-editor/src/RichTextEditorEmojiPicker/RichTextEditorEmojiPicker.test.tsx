import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso-test-utils'

import { RichTextEditorEmojiPicker } from './RichTextEditorEmojiPicker'

const renderEmojiPicker = () =>
  render(<RichTextEditorEmojiPicker onInsertEmoji={jest.fn()} />)

// The wrapper that shows and hides the picker sits two levels above the
// emoji-mart element: wrapper > EmojiMartPicker's div > em-emoji-picker
const getPickerWrapper = (container: HTMLElement) =>
  container.querySelector('em-emoji-picker')?.parentElement
    ?.parentElement as HTMLElement

describe('RichTextEditorEmojiPicker', () => {
  it('keeps the picker hidden and click-through until opened', () => {
    const { container } = renderEmojiPicker()

    const wrapper = getPickerWrapper(container)

    expect(wrapper).toHaveClass('opacity-0', 'pointer-events-none')
    expect(wrapper).not.toHaveClass('pointer-events-auto')
  })

  it('opens the picker with pointer events on, so emoji clicks reach it', () => {
    const { container } = renderEmojiPicker()

    fireEvent.click(screen.getByRole('button'))

    const wrapper = getPickerWrapper(container)

    expect(wrapper).toHaveClass('opacity-100', 'pointer-events-auto')
    // a leftover `pointer-events-none` wins on stylesheet order and swallows
    // every click on the open picker
    expect(wrapper).not.toHaveClass('pointer-events-none')
    expect(wrapper).not.toHaveClass('opacity-0')
  })
})

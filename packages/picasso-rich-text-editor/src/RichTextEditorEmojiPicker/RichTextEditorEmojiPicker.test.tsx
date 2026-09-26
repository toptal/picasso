import React from 'react'
import { Picker } from 'emoji-mart'
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@toptal/picasso-test-utils'

import { RichTextEditorEmojiPicker } from './RichTextEditorEmojiPicker'
import type { CustomEmojiGroup } from '../plugins/EmojiPlugin'

const onInsertEmoji = jest.fn()

const renderEmojiPicker = (customEmojis?: CustomEmojiGroup[]) =>
  render(
    <RichTextEditorEmojiPicker
      customEmojis={customEmojis}
      onInsertEmoji={onInsertEmoji}
    />
  )

const openPicker = () => fireEvent.click(screen.getByRole('button'))

// emoji-mart is loaded lazily, so its element appears after the first open
const findPicker = (container: HTMLElement) =>
  waitFor(() => {
    const picker = container.querySelector('em-emoji-picker')

    if (!picker) {
      throw new Error('emoji-mart picker is not mounted')
    }

    return picker
  })

// emoji-mart listens for outside clicks once it has rendered
const findListeningPicker = async (container: HTMLElement) => {
  const picker = await findPicker(container)

  await waitFor(() =>
    expect(picker.shadowRoot?.querySelector('#root')).toBeInTheDocument()
  )

  return picker
}

// wrapper > EmojiMartPicker's div > em-emoji-picker
const getWrapper = (picker: Element) => picker.parentElement?.parentElement

describe('RichTextEditorEmojiPicker', () => {
  it('does not mount emoji-mart until the picker is first opened', async () => {
    const { container } = renderEmojiPicker()

    // settles a lazy load, had one started
    await act(async () => {})

    expect(container.querySelector('em-emoji-picker')).not.toBeInTheDocument()
  })

  it('opens the picker with pointer events on, so emoji clicks reach it', async () => {
    const { container } = renderEmojiPicker()

    openPicker()

    const wrapper = getWrapper(await findPicker(container))

    expect(wrapper).toHaveClass('opacity-100', 'pointer-events-auto')
    // a leftover `pointer-events-none` would swallow every click on the picker
    expect(wrapper).not.toHaveClass('pointer-events-none')
    expect(wrapper).not.toHaveClass('opacity-0')
  })

  it('closes the picker on Escape and keeps emoji-mart mounted', async () => {
    const { container } = renderEmojiPicker()

    openPicker()

    const picker = await findPicker(container)

    fireEvent.keyUp(document.body, { key: 'Escape' })

    expect(getWrapper(picker)).toHaveClass('opacity-0', 'pointer-events-none')
    expect(getWrapper(picker)).not.toHaveClass('pointer-events-auto')
    expect(picker).toBeInTheDocument()
  })

  it('closes the picker on a click outside it', async () => {
    const { container } = renderEmojiPicker()

    openPicker()

    const picker = await findListeningPicker(container)

    fireEvent.click(document.body)

    expect(getWrapper(picker)).toHaveClass('opacity-0', 'pointer-events-none')
  })

  it('reopens from the toggle while emoji-mart listens for outside clicks', async () => {
    const { container } = renderEmojiPicker()

    openPicker()

    const picker = await findListeningPicker(container)

    openPicker()
    openPicker()

    expect(getWrapper(picker)).toHaveClass('opacity-100', 'pointer-events-auto')
  })

  it('passes the custom emojis to emoji-mart', async () => {
    // an empty group is skipped by emoji-mart, whose shared state would
    // otherwise break the pickers left over from earlier tests
    const customEmojis: CustomEmojiGroup[] = [
      { id: 'team', name: 'Team', emojis: [] },
    ]
    const { container } = renderEmojiPicker(customEmojis)

    openPicker()

    expect(await findPicker(container)).toHaveProperty(
      'props.custom',
      customEmojis
    )
  })

  it('pushes no props into emoji-mart on re-renders, closing or reopening', async () => {
    const { container, rerender } = renderEmojiPicker()

    openPicker()
    await findPicker(container)

    const update = jest.spyOn(Picker.prototype, 'update')

    rerender(<RichTextEditorEmojiPicker onInsertEmoji={onInsertEmoji} />)
    fireEvent.keyUp(document.body, { key: 'Escape' })
    openPicker()

    expect(update).not.toHaveBeenCalled()

    update.mockRestore()
  })
})

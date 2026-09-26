import React, { StrictMode } from 'react'
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'
import { render, waitFor } from '@toptal/picasso-test-utils'

import EmojiMartPicker from './EmojiMartPicker'
import type { CustomEmojiGroup } from '../plugins/EmojiPlugin'

const onEmojiSelect = jest.fn()

const renderEmojiMartPicker = () =>
  render(<EmojiMartPicker onEmojiSelect={onEmojiSelect} />)

describe('EmojiMartPicker', () => {
  it('mounts the emoji-mart picker element', async () => {
    const { container } = renderEmojiMartPicker()

    await waitFor(() =>
      expect(container.querySelector('em-emoji-picker')).toBeInTheDocument()
    )
  })

  it('hands the picker the bundled dataset', async () => {
    const { container } = renderEmojiMartPicker()

    // without it, emoji-mart fetches the dataset from cdn.jsdelivr.net
    await waitFor(() =>
      expect(container.querySelector('em-emoji-picker')).toHaveProperty(
        'props.data',
        data
      )
    )
  })

  it('pushes only changed props into the mounted picker', () => {
    const update = jest.spyOn(Picker.prototype, 'update')
    const custom: CustomEmojiGroup[] = []
    const onClickOutside = jest.fn()
    const { rerender } = render(
      <EmojiMartPicker custom={custom} onEmojiSelect={onEmojiSelect} />
    )

    rerender(<EmojiMartPicker custom={custom} onEmojiSelect={onEmojiSelect} />)

    // re-pushing an unchanged `custom` still makes emoji-mart rebuild its grid
    expect(update).not.toHaveBeenCalled()

    rerender(
      <EmojiMartPicker
        custom={custom}
        onEmojiSelect={onEmojiSelect}
        onClickOutside={onClickOutside}
      />
    )

    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith({ onClickOutside })

    update.mockRestore()
  })

  it('renders a single picker when StrictMode replays the mount effect', async () => {
    const { container } = render(
      <StrictMode>
        <EmojiMartPicker onEmojiSelect={onEmojiSelect} />
      </StrictMode>
    )

    await waitFor(() =>
      expect(container.querySelectorAll('em-emoji-picker')).toHaveLength(1)
    )
  })
})

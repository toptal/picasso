import React, { StrictMode } from 'react'
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'
import { render, waitFor } from '@toptal/picasso-test-utils'

import EmojiMartPicker from './EmojiMartPicker'

const onEmojiSelect = jest.fn()

const renderEmojiMartPicker = () =>
  render(<EmojiMartPicker data={data} onEmojiSelect={onEmojiSelect} />)

describe('EmojiMartPicker', () => {
  it('mounts the emoji-mart picker element', async () => {
    const { container } = renderEmojiMartPicker()

    await waitFor(() =>
      expect(container.querySelector('em-emoji-picker')).toBeInTheDocument()
    )
  })

  it('pushes prop changes into the mounted picker', async () => {
    const update = jest.spyOn(Picker.prototype, 'update')
    const onClickOutside = jest.fn()
    const { rerender } = renderEmojiMartPicker()

    rerender(
      <EmojiMartPicker
        data={data}
        onEmojiSelect={onEmojiSelect}
        onClickOutside={onClickOutside}
      />
    )

    await waitFor(() =>
      expect(update).toHaveBeenCalledWith(
        expect.objectContaining({ onClickOutside })
      )
    )

    update.mockRestore()
  })

  it('renders a single picker when StrictMode replays the mount effect', async () => {
    const { container } = render(
      <StrictMode>
        <EmojiMartPicker data={data} onEmojiSelect={onEmojiSelect} />
      </StrictMode>
    )

    await waitFor(() =>
      expect(container.querySelectorAll('em-emoji-picker')).toHaveLength(1)
    )
  })
})

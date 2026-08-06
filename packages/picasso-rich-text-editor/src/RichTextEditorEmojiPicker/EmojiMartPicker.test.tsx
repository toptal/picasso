import React from 'react'
import data from '@emoji-mart/data'
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
})

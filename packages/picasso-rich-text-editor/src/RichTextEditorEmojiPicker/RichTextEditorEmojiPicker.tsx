/* eslint-disable no-inline-styles/no-inline-styles */
import React, { useEffect } from 'react'
import data from '@emoji-mart/data'
import cx from 'classnames'
import { Container } from '@toptal/picasso-container'

import RichTextEditorButton from '../RichTextEditorButton'
import EmojiMartPicker from './EmojiMartPicker'
import type { CustomEmojiGroup, Emoji } from '../plugins/EmojiPlugin'

interface Props {
  customEmojis?: CustomEmojiGroup[]
  onInsertEmoji: (emoji: Emoji) => void
  disabled?: boolean
}

const TRIGGER_EMOJI_PICKER_ID = 'trigger-emoji-picker'

const classes = {
  emojiPicker: 'absolute top-[34px] left-0 z-10 opacity-0 pointer-events-none',
  activeOpacity: 'opacity-100',
  activePointers: '[pointer-events:all]',
}

export const RichTextEditorEmojiPicker = ({
  customEmojis,
  onInsertEmoji,
  disabled,
}: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)

  const handleEmojiPickerClick = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const closePicker = () => {
    setShowEmojiPicker(false)
  }

  const handleEmojiInsert = (emoji: Emoji) => {
    onInsertEmoji(emoji)
    setShowEmojiPicker(false)
  }

  useEffect(() => {
    if (!showEmojiPicker) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowEmojiPicker(false)
      }
    }

    document.body.addEventListener('keyup', closeOnEscape)

    return () => {
      document.body.removeEventListener('keyup', closeOnEscape)
    }
  }, [showEmojiPicker])

  return (
    <Container style={{ position: 'relative' }}>
      <RichTextEditorButton
        onClick={handleEmojiPickerClick}
        icon={<Container style={{ pointerEvents: 'none' }}>🙂</Container>}
        id={TRIGGER_EMOJI_PICKER_ID}
        disabled={disabled}
      />
      <Container
        className={cx(
          classes.emojiPicker,
          showEmojiPicker && classes.activeOpacity,
          showEmojiPicker && classes.activePointers
        )}
      >
        <EmojiMartPicker
          data={data}
          custom={customEmojis}
          onEmojiSelect={handleEmojiInsert}
          onClickOutside={showEmojiPicker ? closePicker : undefined}
        />
      </Container>
    </Container>
  )
}

/* eslint-disable no-inline-styles/no-inline-styles */
import React, { useEffect } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import cx from 'classnames'

import Container from '../Container'
import TextEditorButton from '../RichTextEditorButton'
import type { CustomEmojiGroup } from '../QuillEditor'

interface Props {
  richEditorId: string
  customEmojis?: CustomEmojiGroup[]
  onInsertEmoji: (emoji: string) => void
}

const TRIGGER_EMOJI_PICKER_ID = 'trigger-emoji-picker'

interface StyleProps {
  showEmojiPicker: boolean
}

const useStyles = makeStyles<Theme, StyleProps>({
  emojiPicker: {
    position: 'absolute',
    top: 34,
    left: 0,
    zIndex: 10,
    opacity: 0,
    pointerEvents: 'none',
  },
  activeOpacity: { opacity: 1 },
  activePointers: { pointerEvents: 'all' },
})

const handleEmojiPickerEscBehaviour = (
  event: KeyboardEvent,
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (event.key === 'Escape') {
    setShowEmojiPicker(false)
  }
}

export const RichtTextEditorEmojiPicker = ({
  richEditorId,
  customEmojis,
  onInsertEmoji,
}: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)

  const classes = useStyles({ showEmojiPicker })

  const handleEmojiPickerClick = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const closePicker = () => {
    setShowEmojiPicker(false)
  }

  const handleEmojiInsert = (emoji: string) => {
    onInsertEmoji(emoji)
    setShowEmojiPicker(false)
  }

  useEffect(() => {
    if (!showEmojiPicker) {
      return
    }

    document.body.addEventListener('keyup', event => {
      handleEmojiPickerEscBehaviour(event, setShowEmojiPicker)
    })

    return () => {
      document.body.removeEventListener('keyup', event => {
        handleEmojiPickerEscBehaviour(event, setShowEmojiPicker)
      })
    }
  }, [showEmojiPicker, setShowEmojiPicker])

  return (
    <Container style={{ position: 'relative' }}>
      <TextEditorButton
        onClick={handleEmojiPickerClick}
        icon={<Container style={{ pointerEvents: 'none' }}>🙂</Container>}
        id={TRIGGER_EMOJI_PICKER_ID}
      />
      <Container
        className={cx(
          classes.emojiPicker,
          showEmojiPicker && classes.activeOpacity,
          showEmojiPicker && classes.activePointers
        )}
      >
        <Picker
          id={`emoji-picker-${richEditorId}`}
          key={`emoji-picker-${richEditorId}`}
          data={data}
          custom={customEmojis}
          onEmojiSelect={handleEmojiInsert}
          onClickOutside={showEmojiPicker && closePicker}
        />
      </Container>
    </Container>
  )
}

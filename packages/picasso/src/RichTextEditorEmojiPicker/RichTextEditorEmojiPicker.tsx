import React, { useEffect } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import Container from '../Container'
import TextEditorButton from '../RichTextEditorButton'
import styles from '../Icon/styles'

interface Props {
  onInsertEmoji: (emoji: string) => void
}

const EMOJI_PICKER_LOCAL_NAME = 'em-emoji-picker'
const TRIGGER_EMOJI_PICKER_ID = 'trigger-emoji-picker'

const handleEmojiPickerBehaviour = (
  event: MouseEvent,
  showEmojiPicker: boolean,
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!showEmojiPicker) {
    return
  }

  // If we click on the trigger but the picker is shown, we should do nothing
  // @ts-ignore
  if (event.target.offsetParent.id === TRIGGER_EMOJI_PICKER_ID) {
    return
  }

  // If we click on the emoji picker custom component, we should keep it open :)
  // @ts-ignore
  if (event.target.localName === EMOJI_PICKER_LOCAL_NAME) {
    return
  }

  setShowEmojiPicker(false)
}

const handleEmojiPickerEscBehaviour = (
  event: KeyboardEvent,
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (event.key === 'Escape') {
    setShowEmojiPicker(false)
  }
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'RichTextEditorToolbar',
})

export const RichtTextEditorEmojiPicker = ({ onInsertEmoji }: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)

  const classes = useStyles({
    onInsertEmoji,
  })

  const handleEmojiPickerClick = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  useEffect(() => {
    if (!showEmojiPicker) {
      return
    }

    document.body.addEventListener('keyup', event => {
      handleEmojiPickerEscBehaviour(event, setShowEmojiPicker)
    })
    document.body.addEventListener('click', event => {
      handleEmojiPickerBehaviour(event, showEmojiPicker, setShowEmojiPicker)
    })

    return () => {
      document.body.removeEventListener('click', event => {
        handleEmojiPickerBehaviour(event, showEmojiPicker, setShowEmojiPicker)
      })
      document.body.removeEventListener('keyup', event => {
        handleEmojiPickerEscBehaviour(event, setShowEmojiPicker)
      })
    }
  }, [showEmojiPicker, setShowEmojiPicker])

  return (
    <Container className={classes.group} style={{ position: 'relative' }}>
      <TextEditorButton
        onClick={handleEmojiPickerClick}
        icon={<Container style={{ pointerEvents: 'none' }}>🙂</Container>}
        id={TRIGGER_EMOJI_PICKER_ID}
      />
      {showEmojiPicker && (
        <Container
          style={{ position: 'absolute', top: 34, left: 0, zIndex: 10 }}
        >
          <Picker data={data} onEmojiSelect={onInsertEmoji} />
        </Container>
      )}
    </Container>
  )
}

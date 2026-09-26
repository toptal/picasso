/* eslint-disable no-inline-styles/no-inline-styles */
import React, { lazy, Suspense, useCallback, useEffect, useRef } from 'react'
import { Container } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import RichTextEditorButton from '../RichTextEditorButton'
import type { CustomEmojiGroup, Emoji } from '../plugins/EmojiPlugin'

// loaded on the first open; its own Suspense keeps the load from suspending the
// whole editor
const EmojiMartPicker = lazy(() => import('./EmojiMartPicker'))

interface Props {
  customEmojis?: CustomEmojiGroup[]
  onInsertEmoji: (emoji: Emoji) => void
  disabled?: boolean
}

const TRIGGER_EMOJI_PICKER_ID = 'trigger-emoji-picker'

export const RichTextEditorEmojiPicker = ({
  customEmojis,
  onInsertEmoji,
  disabled,
}: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
  // kept after the first open, so closing only hides emoji-mart
  const [pickerMounted, setPickerMounted] = React.useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const handleEmojiPickerClick = () => {
    setShowEmojiPicker(!showEmojiPicker)
    setPickerMounted(true)
  }

  // stable, so re-renders push no props into emoji-mart
  const closePicker = useCallback((event: MouseEvent) => {
    // the toggle handles its own clicks, which emoji-mart reports as outside
    if (
      event.target instanceof Node &&
      rootRef.current?.contains(event.target)
    ) {
      return
    }

    setShowEmojiPicker(false)
  }, [])

  const handleEmojiInsert = useCallback(
    (emoji: Emoji) => {
      onInsertEmoji(emoji)
      setShowEmojiPicker(false)
    },
    [onInsertEmoji]
  )

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
    <Container ref={rootRef} style={{ position: 'relative' }}>
      <RichTextEditorButton
        onClick={handleEmojiPickerClick}
        icon={<Container style={{ pointerEvents: 'none' }}>🙂</Container>}
        id={TRIGGER_EMOJI_PICKER_ID}
        disabled={disabled}
      />
      <Container
        // twMerge drops the hidden-state classes when open; leaving
        // `pointer-events-none` in place would let stylesheet order decide,
        // and it wins, so clicks fall through the open picker to the editor
        className={twMerge(
          'absolute top-[34px] left-0 z-10 opacity-0 pointer-events-none',
          showEmojiPicker && 'opacity-100 pointer-events-auto'
        )}
      >
        {pickerMounted && (
          <Suspense fallback={null}>
            <EmojiMartPicker
              custom={customEmojis}
              onEmojiSelect={handleEmojiInsert}
              onClickOutside={closePicker}
            />
          </Suspense>
        )}
      </Container>
    </Container>
  )
}

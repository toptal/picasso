/* eslint-disable no-inline-styles/no-inline-styles */
import type { ReactNode } from 'react'
import React, {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Container } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import RichTextEditorButton from '../RichTextEditorButton'
import type { CustomEmojiGroup, Emoji } from '../plugins/EmojiPlugin'

// loaded on the first open; its own Suspense keeps the load from suspending the
// whole editor
const EmojiMartPicker = lazy(() => import('./EmojiMartPicker'))

// renders nothing if emoji-mart fails to load, so the editor keeps its value
class LoadErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

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
}: Props): React.ReactElement => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  // kept after the first open, so closing only hides emoji-mart
  const [pickerMounted, setPickerMounted] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const handleEmojiPickerClick = () => {
    setShowEmojiPicker(!showEmojiPicker)
    setPickerMounted(true)
  }

  // stable, so re-renders push no props into emoji-mart
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

    // handled here rather than by emoji-mart, so it also works while emoji-mart
    // loads; clicks on the toggle and in the picker land inside the root
    const closeOnClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setShowEmojiPicker(false)
      }
    }

    document.body.addEventListener('keyup', closeOnEscape)
    document.addEventListener('click', closeOnClickOutside)

    return () => {
      document.body.removeEventListener('keyup', closeOnEscape)
      document.removeEventListener('click', closeOnClickOutside)
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
          <LoadErrorBoundary>
            <Suspense fallback={null}>
              <EmojiMartPicker
                custom={customEmojis}
                onEmojiSelect={handleEmojiInsert}
              />
            </Suspense>
          </LoadErrorBoundary>
        )}
      </Container>
    </Container>
  )
}

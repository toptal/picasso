import React, { useEffect, useRef } from 'react'
import { Picker } from 'emoji-mart'

import type { CustomEmojiGroup, Emoji } from '../plugins/EmojiPlugin'

interface Props {
  /** Emoji dataset to render, as exported by `@emoji-mart/data` */
  data: unknown
  /** Additional groups of custom emojis appended to the picker */
  custom?: CustomEmojiGroup[]
  /** Called with the picked emoji when a selection is made */
  onEmojiSelect: (emoji: Emoji) => void
  /** Called when a click lands outside the picker */
  onClickOutside?: () => void
}

/**
 * Renders emoji-mart's `Picker` custom element.
 *
 * `Picker` appends itself to the element passed as `ref` and is fed prop
 * changes through `update`, so it is constructed after the first commit and
 * updated on every commit after that. An effect replay on the same instance
 * (StrictMode, Fast Refresh) finds the picker still attached and updates it
 * too, instead of constructing a second one.
 */
const EmojiMartPicker = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pickerRef = useRef<Picker | null>(null)

  useEffect(() => {
    if (!pickerRef.current) {
      pickerRef.current = new Picker({ ...props, ref: containerRef })

      return
    }

    pickerRef.current.update(props)
  })

  return <div ref={containerRef} />
}

EmojiMartPicker.displayName = 'EmojiMartPicker'

export default EmojiMartPicker

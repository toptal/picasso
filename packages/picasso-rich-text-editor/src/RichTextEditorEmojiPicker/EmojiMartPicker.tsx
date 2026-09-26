import React, { useEffect, useRef } from 'react'
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

import type { CustomEmojiGroup, Emoji } from '../plugins/EmojiPlugin'

interface Props {
  /** Additional groups of custom emojis appended to the picker */
  custom?: CustomEmojiGroup[]
  /** Called with the picked emoji when a selection is made */
  onEmojiSelect: (emoji: Emoji) => void
  /** Called with the click event when a click lands outside the picker */
  onClickOutside?: (event: MouseEvent) => void
}

// emoji-mart re-applies every key passed to `update` and rebuilds its grid for
// `custom`, so only changed props are pushed
const getChangedProps = (previous: Props, next: Props) => {
  const keys = Object.keys({ ...previous, ...next }) as (keyof Props)[]
  const changedKeys = keys.filter(key => previous[key] !== next[key])

  return changedKeys.length
    ? Object.fromEntries(changedKeys.map(key => [key, next[key]]))
    : undefined
}

/**
 * Renders emoji-mart's `Picker` with the native emoji set. Keep every
 * emoji-mart import in this module, so they all load lazily with it.
 *
 * `Picker` appends itself to the `ref` element, so it is constructed after the
 * first commit and fed changed props through `update` after that; an effect
 * replay (StrictMode, Fast Refresh) finds it already constructed.
 */
const EmojiMartPicker = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pickerRef = useRef<Picker | null>(null)
  const pushedPropsRef = useRef(props)

  useEffect(() => {
    if (!pickerRef.current) {
      pickerRef.current = new Picker({ ...props, data, ref: containerRef })
    } else {
      const changedProps = getChangedProps(pushedPropsRef.current, props)

      if (changedProps) {
        pickerRef.current.update(changedProps)
      }
    }

    pushedPropsRef.current = props
  })

  return <div ref={containerRef} />
}

EmojiMartPicker.displayName = 'EmojiMartPicker'

export default EmojiMartPicker

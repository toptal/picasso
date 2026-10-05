import type React from 'react'
import { useRef, useState } from 'react'

import type { HourCycle } from './utils'

interface Options {
  enabled: boolean
  getHourCycle: () => HourCycle
}

export const useTimePickerPopover = ({ enabled, getHourCycle }: Options) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hourCycle, setHourCycle] = useState<HourCycle>(24)
  const anchorRef = useRef<HTMLElement>(null)
  const focusListOnOpen = useRef(false)

  const focusField = () =>
    anchorRef.current
      ?.querySelector<HTMLInputElement>('input:not([readonly])')
      ?.focus()

  const open = ({ focusList }: { focusList: boolean }) => {
    focusListOnOpen.current = focusList
    setHourCycle(getHourCycle())
    setIsOpen(true)
  }

  const close = () => setIsOpen(false)

  const closeAndFocusField = () => {
    close()
    focusField()
  }

  const handleTriggerClick = () => {
    if (isOpen) {
      close()

      return
    }

    open({ focusList: false })
    focusField()
  }

  const handleClickAway = (event: React.MouseEvent) => {
    if (!anchorRef.current?.contains(event.target as Node)) {
      close()
    }
  }

  const handleFieldKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isOpen) {
      if (enabled && event.key === 'ArrowDown' && event.altKey) {
        event.preventDefault()
        open({ focusList: true })
      }

      return
    }

    switch (event.key) {
      case 'Escape':
        // Keeps a surrounding Modal or Drawer open while the list closes
        event.stopPropagation()
        close()
        break
      case 'Enter':
        event.preventDefault()
        close()
        break
      case 'Tab':
        close()
        break
    }
  }

  return {
    isOpen,
    hourCycle,
    anchorRef,
    focusListOnOpen: focusListOnOpen.current,
    handleTriggerClick,
    handleClickAway,
    closeAndFocusField,
    handleFieldKeyDown,
  }
}

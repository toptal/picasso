import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import type { HourCycle } from './utils'

interface Options {
  enabled: boolean
  getHourCycle: () => HourCycle
}

// The shortcuts a browser uses to open the native time picker
const isOpenShortcut = (event: React.KeyboardEvent) =>
  event.key === ' ' || (event.key === 'ArrowDown' && event.altKey)

export const useTimePickerPopover = ({ enabled, getHourCycle }: Options) => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusList, setFocusList] = useState(false)
  const [hourCycle, setHourCycle] = useState<HourCycle>(24)
  const anchorRef = useRef<HTMLElement>(null)

  const focusField = () =>
    anchorRef.current
      ?.querySelector<HTMLInputElement>('input:not([readonly])')
      ?.focus()

  const open = ({ focusList: shouldFocusList }: { focusList: boolean }) => {
    setFocusList(shouldFocusList)
    setHourCycle(getHourCycle())
    setIsOpen(true)
  }

  const close = () => setIsOpen(false)

  useEffect(() => {
    if (!enabled) {
      close()
    }
  }, [enabled])

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

  const handleFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (enabled && isOpenShortcut(event)) {
        event.preventDefault()
        open({ focusList: true })
      }

      return
    }

    if (isOpenShortcut(event)) {
      // Keeps the browser from opening its own time picker over the list
      event.preventDefault()
      setFocusList(true)

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
    focusList,
    handleTriggerClick,
    handleClickAway,
    closeAndFocusField,
    handleFieldKeyDown,
  }
}

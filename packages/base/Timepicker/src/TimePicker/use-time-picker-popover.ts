import type React from 'react'
import { useRef, useState } from 'react'

import type { HourCycle } from './utils'

interface Options {
  value?: string
  isInteractive: boolean
  getHourCycle: () => HourCycle
  onChange: (value: string) => void
}

export const useTimePickerPopover = ({
  value,
  isInteractive,
  getHourCycle,
  onChange,
}: Options) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hourCycle, setHourCycle] = useState<HourCycle>(24)
  const anchorRef = useRef<HTMLElement>(null)
  const valueOnOpen = useRef(value)
  const focusColumnsOnOpen = useRef(false)

  const focusField = () =>
    anchorRef.current
      ?.querySelector<HTMLInputElement>('input:not([readonly])')
      ?.focus()

  const open = ({ focusColumns }: { focusColumns: boolean }) => {
    valueOnOpen.current = value
    focusColumnsOnOpen.current = focusColumns
    setHourCycle(getHourCycle())
    setIsOpen(true)
  }

  const close = ({ revert }: { revert: boolean }) => {
    setIsOpen(false)

    if (revert && value !== valueOnOpen.current) {
      onChange(valueOnOpen.current ?? '')
    }
  }

  const handleTriggerClick = () => {
    if (isOpen) {
      close({ revert: false })

      return
    }

    open({ focusColumns: false })
    focusField()
  }

  const handleClickAway = (event: React.MouseEvent) => {
    if (!anchorRef.current?.contains(event.target as Node)) {
      close({ revert: false })
    }
  }

  const handleColumnsClose = ({ revert }: { revert: boolean }) => {
    close({ revert })
    focusField()
  }

  const handleFieldKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isOpen) {
      if (event.key === 'ArrowDown' && event.altKey && isInteractive) {
        event.preventDefault()
        open({ focusColumns: true })
      }

      return
    }

    switch (event.key) {
      case 'Escape':
        // Keeps a surrounding Modal or Drawer open while the picker closes
        event.stopPropagation()
        close({ revert: true })
        break
      case 'Enter':
        event.preventDefault()
        close({ revert: false })
        break
      case 'Tab':
        close({ revert: false })
        break
    }
  }

  return {
    isOpen,
    hourCycle,
    anchorRef,
    focusColumnsOnOpen: focusColumnsOnOpen.current,
    handleTriggerClick,
    handleClickAway,
    handleColumnsClose,
    handleFieldKeyDown,
  }
}

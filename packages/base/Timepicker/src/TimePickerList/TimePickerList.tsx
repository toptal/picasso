import React, { useMemo, useRef, useState } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Menu, MenuItem } from '@toptal/picasso-menu'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import {
  getCurrentTime,
  getNearestOptionIndex,
  getTimeOptions,
  parseTime,
} from '../TimePicker/utils'
import type { HourCycle, TimeOption } from '../TimePicker/utils'

export interface Props extends BaseProps {
  /** Selected time in 24-hour `HH:mm` format */
  value?: string
  /** Interval in minutes between the offered times */
  minuteStep: number
  /** Whether the times are labelled on a 12-hour clock with AM/PM or a 24-hour clock */
  hourCycle: HourCycle
  /** Moves focus to the selected or nearest time when the list appears */
  autoFocus?: boolean
  /** Called with the picked time in 24-hour `HH:mm` format */
  onChange: (value: string) => void
  /** Called when the keyboard asks to close the list */
  onClose: () => void
}

const OPTION = '[role="option"]'

const preventFocusLoss = (event: React.MouseEvent) => {
  // Clicking a time must keep the caret in the field, like the browser picker does
  event.preventDefault()
}

const getStartingIndex = (
  options: TimeOption[],
  minuteStep: number,
  value?: string
) => {
  const selectedIndex = options.findIndex(option => option.value === value)

  return selectedIndex >= 0
    ? selectedIndex
    : getNearestOptionIndex(parseTime(value) ?? getCurrentTime(), minuteStep)
}

const getNextIndex = (key: string, index: number, count: number) => {
  switch (key) {
    case 'ArrowDown':
      return Math.min(index + 1, count - 1)
    case 'ArrowUp':
      return Math.max(index - 1, 0)
    case 'Home':
      return 0
    case 'End':
      return count - 1
    default:
      return undefined
  }
}

export const TimePickerList = ({
  value,
  minuteStep,
  hourCycle,
  autoFocus = false,
  onChange,
  onClose,
  className,
  style,
  'data-testid': dataTestId,
}: Props) => {
  const listRef = useRef<HTMLUListElement>(null)
  const options = useMemo(
    () => getTimeOptions(minuteStep, hourCycle),
    [minuteStep, hourCycle]
  )
  const [startingIndex] = useState(() =>
    getStartingIndex(options, minuteStep, value)
  )

  const getOptionElements = () =>
    Array.from(listRef.current?.querySelectorAll<HTMLElement>(OPTION) ?? [])

  useIsomorphicLayoutEffect(() => {
    const list = listRef.current
    const option = list?.querySelectorAll<HTMLElement>(OPTION)[startingIndex]

    if (!list || !option) {
      return
    }

    const listRect = list.getBoundingClientRect()
    const optionRect = option.getBoundingClientRect()

    list.scrollTop +=
      optionRect.top - listRect.top - (listRect.height - optionRect.height) / 2

    if (autoFocus) {
      option.focus({ preventScroll: true })
    }
  }, [startingIndex, autoFocus])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const optionElements = getOptionElements()
    const index = optionElements.indexOf(
      (event.target as HTMLElement).closest<HTMLElement>(OPTION) as HTMLElement
    )

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        event.stopPropagation()

        if (index >= 0) {
          onChange(options[index].value)
        }
        break
      case 'Escape':
        // Keeps a surrounding Modal or Drawer open while the list closes
        event.stopPropagation()
        onClose()
        break
      case 'Tab':
        onClose()
        break
      default: {
        const nextIndex = getNextIndex(event.key, index, options.length)

        if (nextIndex !== undefined) {
          event.preventDefault()
          optionElements[nextIndex]?.focus()
        }
      }
    }
  }

  return (
    <Menu
      ref={listRef}
      role='listbox'
      aria-label='Choose time'
      onKeyDown={handleKeyDown}
      onMouseDown={preventFocusLoss}
      className={twMerge(
        'bg-white shadow-5 max-h-[15rem] overflow-y-auto',
        className
      )}
      style={style}
      data-testid={dataTestId}
    >
      {options.map(option => (
        <MenuItem
          key={option.value}
          role='option'
          aria-selected={option.value === value}
          checkmarked={option.value === value}
          titleCase={false}
          className='tabular-nums'
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  )
}

TimePickerList.displayName = 'TimePickerList'

export default TimePickerList

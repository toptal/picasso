import React, { useRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface ColumnOption {
  value: number
  label: string
}

export interface Props extends BaseProps {
  /** Accessible name of the column */
  label: string
  /** Values the column offers, in display order */
  options: ColumnOption[]
  /** Value of the selected option */
  value: number
  /** Called with the value of the picked option */
  onChange: (value: number) => void
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

const scrollToOption = (
  list: HTMLElement,
  option: HTMLElement,
  center: boolean
) => {
  const listRect = list.getBoundingClientRect()
  const optionRect = option.getBoundingClientRect()

  if (center) {
    list.scrollTop +=
      optionRect.top - listRect.top - (listRect.height - optionRect.height) / 2
  } else if (optionRect.top < listRect.top) {
    list.scrollTop -= listRect.top - optionRect.top
  } else if (optionRect.bottom > listRect.bottom) {
    list.scrollTop += optionRect.bottom - listRect.bottom
  }
}

export const TimePickerColumn = ({
  label,
  options,
  value,
  onChange,
  className,
  style,
  'data-testid': dataTestId,
}: Props) => {
  const listRef = useRef<HTMLUListElement>(null)
  const mounted = useRef(false)
  const selectedIndex = options.findIndex(option => option.value === value)

  useIsomorphicLayoutEffect(() => {
    const list = listRef.current
    const selected = list?.children[selectedIndex] as HTMLElement | undefined

    if (list && selected) {
      scrollToOption(list, selected, !mounted.current)
    }

    mounted.current = true
  }, [selectedIndex])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const nextIndex = getNextIndex(event.key, selectedIndex, options.length)

    if (nextIndex === undefined) {
      return
    }

    event.preventDefault()
    onChange(options[nextIndex].value)

    const nextOption = listRef.current?.children[nextIndex] as
      | HTMLElement
      | undefined

    nextOption?.focus()
  }

  return (
    <ul
      ref={listRef}
      role='listbox'
      aria-label={label}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={twMerge(
        'flex flex-col h-[13rem] overflow-y-auto list-none m-0 p-1 outline-hidden',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className
      )}
      style={style}
      data-testid={dataTestId}
    >
      {options.map(option => (
        <li
          key={option.value}
          role='option'
          aria-selected={option.value === value}
          tabIndex={-1}
          onClick={() => onChange(option.value)}
          className={twMerge(
            'flex shrink-0 items-center justify-center w-12 h-8 rounded-sm',
            'text-md text-black tabular-nums cursor-pointer select-none outline-hidden',
            'transition-colors duration-150 ease-in-out',
            'hover:bg-blue-100',
            'aria-selected:bg-blue-500 aria-selected:hover:bg-blue-500',
            'aria-selected:text-white aria-selected:font-semibold',
            'focus-visible:shadow-[0_0_0_3px] focus-visible:shadow-blue-500/48'
          )}
        >
          {option.label}
        </li>
      ))}
    </ul>
  )
}

TimePickerColumn.displayName = 'TimePickerColumn'

export default TimePickerColumn

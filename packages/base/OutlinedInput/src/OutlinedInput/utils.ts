import type { FieldLayout } from '@toptal/picasso-form'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { Props } from './OutlinedInput'

// eslint-disable-next-line complexity
export const getRootClassName = ({
  size,
  width,
  type,
  layout,
  isDark,
  multiline,
  highlight,
  disabled,
  className,
  classes,
  isError,
}: Partial<Props> & {
  isDark: boolean
  layout: FieldLayout
  isError: boolean
}) =>
  twMerge(
    'relative text-black inline-flex p-2 gap-y-1 gap-x-2 items-center rounded-sm',
    '[font-size:_unset] cursor-[inherit] bg-white',
    'hover:[&_.resetButtonDirty]:visible',
    size === 'small' && 'py-1 px-[0.625rem] h-6',
    size === 'medium' && 'p-2 h-8',
    size === 'large' && 'p-3 h-12',
    width === 'full' && 'w-full',
    width === 'shrink' && 'w-auto',
    width === 'auto' && 'w-[18.75rem]',
    layout === 'horizontal' && 'w-full',
    type === 'hidden' && 'hidden',
    multiline && 'h-auto',
    highlight === 'autofill' && 'bg-yellow-100/60',
    'after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0',
    'after:inline-block after:content-[""] after:pointer-events-none after:cursor-default',
    'after:border after:border-solid after:border-gray-400 after:rounded-sm',
    '[&:has(input:focus)]:after:shadow-[0_0_0_3px] [&:has(input:focus)]:after:shadow-blue-500/[.48]',
    '[&:has(input:focus)]:after:border-blue-500',
    isDark &&
      'bg-[#081237] after:border-none [&:has(input:focus)]:after:shadow-0',
    disabled &&
      'after:border-gray-200 bg-gray-100 text-gray-500 cursor-default',
    !disabled &&
      !isError &&
      'hover:[&:not(:has(input:focus))]:after:border-gray-600',
    isError &&
      `after:border-red-500 [&:has(input:focus)]:after:border-red-500 [&:has(input:focus)]:after:shadow-[0_0_0_3px] 
    [&:has(input:focus)]:after:shadow-red-500/[.48]`,
    classes?.root,
    className
  )

// eslint-disable-next-line complexity
export const getInputClassName = ({
  size,
  disabled,
  isDark,
  multiline,
  multilineResizable,
  classes,
  type,
  inputProps,
}: Partial<Props> & { isDark: boolean }) =>
  twMerge(
    'w-full border-none outline-none cursor-[inherit] bg-transparent',
    'box-border h-full p-0 resize-none peer',
    '[&::placeholder]:text-gray-600 [&::placeholder]:opacity-100',
    '[&::-webkit-calendar-picker-indicator]:bg-none',
    size === 'small' && 'text-xxs leading-4',
    size === 'medium' && 'text-md leading-4',
    size === 'large' && 'text-lg leading-4',
    disabled && 'text-gray-600 [&::-webkit-text-fill-color]:text-gray-600',
    // On Safari the text gets a bit lighter as if it had some transparency applied to it
    // We need this webkit-specific property to achieve the exact font color
    disabled && '[&::-webkit-text-fill-color]:text-gray-600',
    // It's a special case for TimePicker
    type === 'time' && inputProps?.disabled && 'text-black',
    isDark &&
      'text-white [&::placeholder]:text-white [&::placeholder]:opacity-[0.64]',
    multiline && 'p-0',
    multiline && multilineResizable && 'resize-y',
    classes?.input,
    inputProps?.className
  )

export const getRows = (rows: number | string | undefined) =>
  typeof Number(rows) === 'number' ? Number(rows) : undefined

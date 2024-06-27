/* eslint-disable max-lines */
import type { FieldLayout } from '@toptal/picasso-form'

import type { Props, Size } from '../OutlinedInput'

const getTextClasses = (size: Size | undefined) => {
  if (size === 'small') {
    return 'text-xxs leading-4'
  }

  if (size === 'medium') {
    return 'text-md leading-4'
  }

  if (size === 'large') {
    return 'text-lg leading-4'
  }

  if (!size) {
    return ''
  }

  const neverCase: never = size

  return neverCase
}

const getFontColorClass = ({
  isDark,
  disabled,
  type,
  inputPropsDisabled,
}: {
  isDark: boolean
  disabled: boolean | undefined
  type: string | undefined
  inputPropsDisabled: boolean | undefined
}) => {
  if (isDark) {
    return 'text-white'
  }

  if (type === 'time' && inputPropsDisabled) {
    // It's a special case for TimePicker
    return 'text-black'
  }

  if (disabled) {
    return [
      'text-gray-600',
      // On Safari the text gets a bit lighter as if it had some transparency applied to it
      // We need this webkit-specific property to achieve the exact font color
      '[&::-webkit-text-fill-color]:text-gray-600',
    ]
  }

  return 'text-black'
}

const getPlaceholderClasses = (isDark: boolean) => {
  if (isDark) {
    return ['[&::placeholder]:text-white', '[&::placeholder]:opacity-[0.64]']
  }

  return ['[&::placeholder]:text-gray-600', '[&::placeholder]:opacity-100']
}

const inputBasicClasses = [
  'w-full',
  'border-none',
  'outline-none',
  'cursor-[inherit]',
  'bg-transparent',
  'box-border',
  'h-full',
  'p-0',
  'resize-none',
  'peer',
  '[&::-webkit-calendar-picker-indicator]:bg-none',
]

const getResizeClass = (
  multiline: boolean | undefined,
  multilineResizable: boolean | undefined
) => (multiline && multilineResizable ? 'resize-y' : '')

export const getInputClassName = ({
  size,
  disabled,
  isDark,
  multiline,
  multilineResizable,
  type,
  inputProps,
}: Partial<Props> & { isDark: boolean }) => [
  inputBasicClasses,
  getTextClasses(size),
  getFontColorClass({
    isDark,
    disabled,
    type,
    inputPropsDisabled: inputProps?.disabled,
  }),
  getPlaceholderClasses(isDark),
  getResizeClass(multiline, multilineResizable),
]

const getMarginClasses = (size: Size | undefined) => {
  if (size === 'small') {
    return 'py-1 px-[0.625rem]'
  }

  if (size === 'medium') {
    return 'p-2'
  }

  if (size === 'large') {
    return 'p-3'
  }

  if (!size) {
    return ''
  }

  const neverCase: never = size

  return neverCase
}

const getHeightClassesBySize = ({
  size,
  multiline,
}: {
  size: Size | undefined
  multiline: boolean | undefined
}) => {
  if (multiline) {
    return 'h-auto'
  }

  if (size === 'small') {
    return 'h-6'
  }

  if (size === 'medium') {
    return 'h-8'
  }

  if (size === 'large') {
    return 'h-12'
  }

  if (!size) {
    return ''
  }

  const neverCase: never = size

  return neverCase
}

const getWidthClasses = ({
  width,
  layout,
}: {
  width: Props['width']
  layout: FieldLayout
}) => {
  if (layout === 'horizontal') {
    return 'w-full'
  }

  if (width === 'full') {
    return 'w-full'
  }

  if (width === 'shrink') {
    return 'w-auto'
  }

  if (width === 'auto') {
    return 'w-[18.75rem]'
  }

  if (!width) {
    return ''
  }

  const neverCase: never = width

  return neverCase
}

const getDisplayClasses = (type: string | undefined) =>
  type === 'hidden' ? 'hidden' : ''

const getBackgroundColorClasses = ({
  isDark,
  disabled,
  highlight,
}: {
  isDark: boolean
  disabled: boolean | undefined
  highlight: string | undefined
}) => {
  if (disabled) {
    return 'bg-gray-100'
  }

  if (isDark) {
    return 'bg-[#081237]'
  }

  if (highlight === 'autofill') {
    return 'bg-yellow-100/60'
  }

  return 'bg-white'
}

const getBorderClass = (isDark: boolean) =>
  isDark ? 'after:border-none' : 'after:border'

const getBorderColorClass = ({
  isError,
  disabled,
}: {
  disabled: boolean | undefined
  isError: boolean
}) => {
  if (isError) {
    return 'after:border-red-500'
  }

  if (disabled) {
    return 'after:border-gray-200'
  }

  return 'after:border-gray-400'
}

const getFocusedInputBorderColorClass = (isError: boolean) => {
  if (isError) {
    return '[&:has(input:focus)]:after:border-red-500'
  }

  return '[&:has(input:focus)]:after:border-blue-500'
}

const getHoverWithoutFocusedInputBorderColorClass = ({
  disabled,
  isError,
}: {
  disabled: boolean | undefined
  isError: boolean
}) => {
  if (!disabled && !isError) {
    return 'hover:[&:not(:has(input:focus))]:after:border-gray-600'
  }

  return ''
}

const getBorderClasses = ({
  isDark,
  disabled,
  isError,
}: {
  isDark: boolean
  isError: boolean
  disabled: boolean | undefined
}) => {
  return [
    'after:border-solid',
    'after:rounded-sm',
    getBorderClass(isDark),
    getBorderColorClass({ isError, disabled }),
  ]
}

const getShadowClasses = ({
  isDark,
  isError,
}: {
  isDark: boolean
  isError: boolean
}) => {
  if (isError) {
    return [
      '[&:has(input:focus)]:after:shadow-[0_0_0_3px]',
      '[&:has(input:focus)]:after:shadow-red-500/[.48]',
    ]
  }

  if (isDark) {
    return '[&:has(input:focus)]:after:shadow-0'
  }

  return [
    '[&:has(input:focus)]:after:shadow-[0_0_0_3px]',
    '[&:has(input:focus)]:after:shadow-blue-500/[.48]',
  ]
}

const getTextColorClass = (disabled: boolean | undefined) =>
  disabled ? 'text-gray-500' : 'text-black'

const getCursorClass = (disabled: boolean | undefined) =>
  disabled ? 'cursor-default' : 'cursor-[inherit]'

const afterElementBasicClasses = [
  'after:absolute',
  'after:top-0',
  'after:bottom-0',
  'after:right-0',
  'after:left-0',
  'after:inline-block',
  'after:content-[""]',
  'after:pointer-events-none',
]

const rootBasicClasses = [
  'relative',
  'text-black',
  'inline-flex',
  'p-2',
  'gap-y-1',
  'gap-x-2',
  'items-center',
  'rounded-sm',
  '[font-size:_unset]',
  'hover:[&_.resetButtonDirty]:visible',
  ...afterElementBasicClasses,
]

export const getRootClassName = ({
  size,
  width,
  type,
  layout,
  isDark,
  multiline,
  highlight,
  disabled,
  isError,
}: Partial<Props> & {
  isDark: boolean
  layout: FieldLayout
  isError: boolean
}) => [
  ...rootBasicClasses,
  getMarginClasses(size),
  getHeightClassesBySize({ size, multiline }),
  getWidthClasses({ width, layout }),
  getDisplayClasses(type),
  getBackgroundColorClasses({ isDark, disabled, highlight }),
  getBorderClasses({ isDark, disabled, isError }),
  getShadowClasses({ isDark, isError }),
  getFocusedInputBorderColorClass(isError),
  getHoverWithoutFocusedInputBorderColorClass({ disabled, isError }),
  getTextColorClass(disabled),
  getCursorClass(disabled),
]

export const getRows = (rows: number | string | undefined) =>
  typeof Number(rows) === 'number' ? Number(rows) : undefined

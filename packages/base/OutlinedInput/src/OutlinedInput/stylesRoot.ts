/* eslint-disable max-lines */
import type { FieldLayout } from '@toptal/picasso-form'

import type { WidthType, Size, Props } from './types'

export const spacingBySize: Record<Size, string> = {
  small: 'py-1 px-[0.625rem]',
  medium: 'p-2',
  large: 'p-3',
}

export const heightClasses = {
  singleline: {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-12',
  } as Record<Size, string>,
  multiline: 'h-auto',
} as const

export const fontColorClass = {
  default: 'text-black',
  disabled: 'text-gray-500',
}

export const cursorClass = {
  default: 'cursor-[inherit]',
  disabled: 'cursor-default',
}

export const bgClasses = {
  disabled: 'bg-gray-200',
  dark: 'bg-[#081237]',
  highlight: 'bg-yellow-100/60',
  default: 'bg-white',
}

export const widthClasses: Record<WidthType | FieldLayout, string> = {
  full: 'w-full',
  shrink: 'w-auto',
  auto: 'w-[18.75rem]',
  horizontal: 'w-full',
  vertical: '',
}

export const borderPseudoCoreClasses = [
  'after:content-[""]',
  'after:inline-block',
  'after:absolute',

  'after:top-0',
  'after:bottom-0',
  'after:right-0',
  'after:left-0',

  'after:pointer-events-none',

  'after:border-solid',
  'after:rounded-sm',
]

export const borderPseudoClassesByState = {
  borderColor: {
    dark: '',
    default: ['after:border-gray-400', '[&:has(:focus)]:after:border-blue-500'],
    disabled: 'after:border-gray-400',
    error: ['after:border-red-500', '[&:has(:focus)]:after:border-red-500'],
    hoverWithoutFocus: 'hover:[&:not(:has(:focus))]:after:border-gray-600',
  },
  border: {
    dark: 'after:border-none',
    default: 'after:border',
    disabled: '',
    error: '',
  },
  shadow: {
    dark: '[&:has(:focus)]:after:shadow-0',
    default: [
      '[&:has(:focus)]:after:shadow-[0_0_0_3px]',
      '[&:has(:focus)]:after:shadow-blue-500/[.48]',
    ],
    disabled: '',
    error: [
      '[&:has(:focus)]:after:shadow-[0_0_0_3px]',
      '[&:has(:focus)]:after:shadow-red-500/[.48]',
    ],
  },
}

export const rootBasicClasses = [
  'relative',
  'text-black',
  'inline-flex',
  'gap-y-1',
  'gap-x-2',
  'items-center',
  'rounded-sm',
  '[font-size:_unset]',
  'hover:[&_.resetButtonDirty]:visible',
  'text-nowrap',
]

export const getHeightClasses = ({
  size,
  multiline,
}: {
  size: Size
  multiline: boolean | undefined
}) => (multiline ? heightClasses.multiline : heightClasses.singleline[size])

export const getWidthClasses = ({
  width,
  layout,
}: {
  width: WidthType
  layout: FieldLayout
}) => (layout === 'horizontal' ? widthClasses.horizontal : widthClasses[width])

export const getBackgroundColorClasses = ({
  isDark,
  disabled,
  highlight,
}: {
  isDark: boolean
  disabled: boolean | undefined
  highlight: string | undefined
}) => {
  if (disabled) {
    return bgClasses.disabled
  }

  if (isDark) {
    return bgClasses.dark
  }

  if (highlight === 'autofill') {
    return bgClasses.highlight
  }

  return bgClasses.default
}

const getTextColorClass = (disabled: boolean | undefined) =>
  disabled ? fontColorClass.disabled : fontColorClass.default

const getCursorClass = (disabled: boolean | undefined) =>
  disabled ? cursorClass.disabled : cursorClass.default

type State = 'default' | 'disabled' | 'error' | 'dark'
type StateConditions = Partial<Record<State, boolean>> & {
  isDark: boolean
  isError: boolean
}

const getClassForState = (
  state: State,
  { borderColor, border, shadow }: typeof borderPseudoClassesByState
) => {
  return [
    borderColor[state] || borderColor.default,
    border[state] || border.default,
    shadow[state] || shadow.default,
  ]
}

const borderPseudoElement = (conditions: StateConditions) => {
  const { disabled, isDark, isError } = conditions
  const { borderColor } = borderPseudoClassesByState
  const primaryState = isError
    ? 'error'
    : disabled
    ? 'disabled'
    : isDark
    ? 'dark'
    : 'default'

  const hoverClass = !disabled && !isError ? borderColor.hoverWithoutFocus : ''

  return [
    borderPseudoCoreClasses,
    getClassForState(primaryState, borderPseudoClassesByState),
    hoverClass,
  ]
}

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
  size: Size
  width: WidthType
}) => [
  rootBasicClasses,
  spacingBySize[size],
  getHeightClasses({ size, multiline }),
  getWidthClasses({ width, layout }),
  getBackgroundColorClasses({ isDark, disabled, highlight }),
  borderPseudoElement({ isDark, disabled, isError }),
  getTextColorClass(disabled),
  getCursorClass(disabled),
  type === 'hidden' && 'hidden',
]

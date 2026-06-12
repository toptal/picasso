import cx from 'classnames'

type Status = 'error' | 'warning' | 'default'

type WrapperState = {
  disabled: boolean
  focused: boolean
  status: Status
  autofill: boolean
}

// Focus-ring box shadows: 0 0 0 3px <palette color @ 0.48 alpha>. No canonical
// token exists for the alpha-blended palette colors.
// TODO(tokens): palette.red.main @ 0.48 alpha
// TODO(tokens): palette.yellow.main @ 0.48 alpha
// TODO(tokens): palette.primary.main @ 0.48 alpha
const FOCUS_OUTLINE: Record<Status, string> = {
  error: 'shadow-[0_0_0_3px_rgba(212,37,81,0.48)]',
  warning: 'shadow-[0_0_0_3px_rgba(229,156,1,0.48)]',
  default: 'shadow-[0_0_0_3px_rgba(32,78,207,0.48)]',
}

const STATUS_BORDER: Record<Status, string> = {
  error: 'border-red-500',
  warning: 'border-yellow-500',
  default: '',
}

// Resolves the legacy JSS cascade (border color + focus outline by state) into a
// single deterministic class set so we don't rely on Tailwind utility ordering.
export const getEditorWrapperClassName = ({
  disabled,
  focused,
  status,
  autofill,
}: WrapperState): string => {
  const focusedBorder = focused ? 'border-gray-600' : 'border-gray-400'
  const borderColor = STATUS_BORDER[status] || focusedBorder
  const outline = focused ? FOCUS_OUTLINE[status] : ''

  return cx(
    'relative rounded-sm border p-[0.5em]',
    borderColor,
    outline,
    // Hover border, suppressed when disabled or in error (matches legacy :not()).
    !disabled && status !== 'error' && 'hover:border-gray-600',
    disabled && 'pointer-events-none',
    // TODO(tokens): palette.yellow.lighter @ 0.6 alpha — no canonical token.
    autofill ? 'bg-[rgba(255,245,227,0.6)]' : disabled && 'bg-gray-200'
  )
}

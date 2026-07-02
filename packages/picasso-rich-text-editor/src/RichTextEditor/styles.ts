import cx from 'classnames'

type Status = 'error' | 'warning' | 'default'

type WrapperState = {
  disabled: boolean
  focused: boolean
  status: Status
  autofill: boolean
}

// Focus-ring box shadows: 0 0 0 3px <token @ 48% alpha>. Only the 3px spread is
// arbitrary (no spread token); the color is the matching palette token with an
// alpha modifier — same pattern as OutlinedInput's focus ring.
const FOCUS_OUTLINE: Record<Status, string> = {
  error: 'shadow-[0_0_0_3px] shadow-red-500/[.48]',
  warning: 'shadow-[0_0_0_3px] shadow-yellow-500/[.48]',
  default: 'shadow-[0_0_0_3px] shadow-blue-500/[.48]',
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
    autofill ? 'bg-yellow-100/60' : disabled && 'bg-gray-200'
  )
}

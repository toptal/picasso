const group =
  "flex items-center relative [pointer-events:unset] [&:not(:last-child):not(:empty)]:after:content-[''] [&:not(:last-child):not(:empty)]:after:h-[1em] [&:not(:last-child):not(:empty)]:after:w-px [&:not(:last-child):not(:empty)]:after:relative [&:not(:last-child):not(:empty)]:after:mx-[0.5em] [&:not(:last-child):not(:empty)]:after:bg-gray-200"

// Width can't be set via className: NonNativeSelect appends its own width class
// (w-full by default) after the consumer className in twMerge, so any width
// utility loses. The wrapper `style` prop is applied directly (not merged), so
// it wins over the class without !important — preserving the legacy 7.125em.
export const selectStyle = { width: '7.125em' } as const

const styles: Record<string, string> = {
  toolbar: 'flex border-b border-gray-400 pb-[0.5em]',
  group,
  groupDisabled: 'pointer-events-none',
}

export default styles

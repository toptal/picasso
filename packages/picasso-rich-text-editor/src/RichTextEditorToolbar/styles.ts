const group =
  "flex items-center relative [pointer-events:unset] [&:not(:last-child):not(:empty)]:after:content-[''] [&:not(:last-child):not(:empty)]:after:h-[1em] [&:not(:last-child):not(:empty)]:after:w-px [&:not(:last-child):not(:empty)]:after:relative [&:not(:last-child):not(:empty)]:after:mx-[0.5em] [&:not(:last-child):not(:empty)]:after:bg-gray-200"

const styles: Record<string, string> = {
  toolbar: 'flex border-b border-gray-400 pb-[0.5em]',
  group,
  select: 'w-[7.125em]',
  groupDisabled: 'pointer-events-none',
}

export default styles

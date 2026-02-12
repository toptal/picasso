import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgService16 = forwardRef(function SvgService16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 16 16'
      className={twMerge(
        'fill-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M7.467.017a8.028 8.028 0 0 0-5.859 3.176C.799 4.26.296 5.477.073 6.906c-.082.523-.082 1.665 0 2.188.342 2.194 1.403 3.995 3.122 5.299 1.062.806 2.286 1.312 3.711 1.534.523.082 1.665.082 2.188 0 1.944-.303 3.596-1.179 4.836-2.565 1.1-1.229 1.735-2.587 1.997-4.268.082-.523.082-1.665 0-2.188-.222-1.425-.728-2.649-1.534-3.711A7.994 7.994 0 0 0 9 .066 12.585 12.585 0 0 0 7.467.017M9.04 1.078c2.791.433 5.064 2.493 5.741 5.203.161.643.192.923.192 1.719s-.031 1.076-.192 1.719a7.022 7.022 0 0 1-4.221 4.795 7.072 7.072 0 0 1-5.046.031c-.283-.108-.821-.359-.821-.383 0-.008.34-.355.755-.77l.754-.754.177.067c.846.318 1.923.37 2.844.137a4.979 4.979 0 0 0 3.682-3.861c.22-1.076.072-2.135-.453-3.236-.09-.19-.182-.386-.204-.436l-.039-.091-1.845 1.843L8.52 8.905l-.16-.086c-.535-.289-.974-.714-1.199-1.163l-.073-.144 1.848-1.848c1.017-1.017 1.842-1.855 1.834-1.863-.032-.032-.881-.417-1.09-.495a4.777 4.777 0 0 0-1.873-.285c-1.861.064-3.499 1.145-4.311 2.846a4.882 4.882 0 0 0-.21 3.701l.084.248-.352.352-.351.353.34.339c.187.187.352.34.367.34.015 0 .288-.261.607-.581l.581-.581-.135-.285c-.41-.87-.515-1.696-.331-2.599.162-.796.635-1.602 1.265-2.157a3.995 3.995 0 0 1 3.49-.902l.196.044-1.539 1.54-1.54 1.54.069.252c.13.479.284.786.593 1.186.427.551 1.189 1.079 1.909 1.32l.243.081 1.539-1.539c.846-.846 1.545-1.528 1.553-1.515.035.057.105.474.121.729.074 1.145-.304 2.203-1.075 3.01a3.983 3.983 0 0 1-1.595 1.04c-.443.157-.721.2-1.285.201-.71.002-1.063-.076-1.755-.386l-.315-.141-1.076 1.075-1.076 1.076-.116-.085a7.944 7.944 0 0 1-.824-.756c-.827-.914-1.369-1.906-1.651-3.02-.168-.664-.2-.94-.2-1.747 0-.807.032-1.083.2-1.747a7.006 7.006 0 0 1 5.026-5.026c.22-.056.544-.121.72-.144l.4-.054c.201-.027 1.401.008 1.667.049'
      />
    </svg>
  )
})

SvgService16.displayName = 'SvgService16'
export default SvgService16

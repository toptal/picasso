import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgFolderMisc24 = forwardRef(function SvgFolderMisc24(
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
      viewBox='0 0 24 24'
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
        d='M1.505 2.063A2.025 2.025 0 0 0 .061 3.502C.007 3.709 0 4.709 0 12c0 9.094-.017 8.472.244 8.962.156.292.502.638.794.794C1.53 22.018.752 22 11.5 22s9.97.018 10.462-.244c.292-.156.638-.502.794-.794.259-.487.244-.022.244-7.462 0-7.44.015-6.975-.244-7.462a2.216 2.216 0 0 0-.795-.794c-.476-.254-.179-.243-6.424-.243C9.192 5 9.619 5.019 9.32 4.72c-.186-.186-.259-.393-.316-.893a1.942 1.942 0 0 0-.184-.694 2.007 2.007 0 0 0-1.397-1.09c-.157-.028-1.169-.042-2.96-.04-2.207.003-2.768.014-2.958.06m5.848.995c.436.153.593.398.667 1.037.042.363.081.515.19.75.231.497.614.85 1.136 1.047l.234.088 5.86.02 5.86.02.16.086c.187.101.341.258.445.454.072.135.075.382.075 6.94v6.8l-.086.16a1.013 1.013 0 0 1-.494.457c-.18.081-.207.081-9.9.081s-9.72 0-9.9-.081a1.013 1.013 0 0 1-.494-.457l-.086-.16V12c0-8.022.003-8.305.075-8.44.14-.263.35-.439.625-.523.055-.016 1.308-.032 2.785-.034 2.243-.002 2.712.006 2.848.055M11 10.65v1.649L9.84 11.14 8.68 9.981l-.35.349-.349.35 1.159 1.16L10.299 13H7v1h3.299L9.14 15.16l-1.159 1.16.349.35.35.349 1.16-1.159L11 14.701V18h1v-3.299l1.17 1.169 1.171 1.17.349-.35.35-.349-1.17-1.171L12.701 14H16v-1h-3.299l1.169-1.17 1.17-1.171-.35-.349-.349-.35-1.171 1.17L12 12.299V9h-1v1.65'
      />
    </svg>
  )
})

SvgFolderMisc24.displayName = 'SvgFolderMisc24'
export default SvgFolderMisc24

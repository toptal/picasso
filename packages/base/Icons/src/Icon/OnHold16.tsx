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
const SvgOnHold16 = forwardRef(function SvgOnHold16(
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
        d='M5.64.296a6.42 6.42 0 0 0-3.808 1.873C.882 3.133.279 4.347.062 5.735c-.066.426-.066 1.383 0 1.812.321 2.071 1.556 3.806 3.389 4.762.928.484 1.87.713 2.936.713.608 0 1.065-.057 1.586-.198.169-.046.334-.089.366-.097l.06-.013.007.462.007.462 1.88 1.088a90.156 90.156 0 0 0 1.907 1.087c.015 0 .873-.489 1.907-1.087l1.88-1.088.006-2.199.006-2.199-1.619-.936-1.62-.936.009-.544c.014-.849-.075-1.464-.32-2.197A6.38 6.38 0 0 0 7.174.305 9.835 9.835 0 0 0 5.64.296m1.288.985a5.4 5.4 0 0 1 4.264 2.922c.256.5.439 1.076.529 1.664.046.298.064 1.157.028 1.346l-.02.107-1.664.96-1.664.96-.001 1.202v1.203l-.247.084a5.375 5.375 0 0 1-3.063.138 5.395 5.395 0 0 1-4.049-4.586 7.622 7.622 0 0 1 0-1.282 5.375 5.375 0 0 1 1.554-3.178c1.126-1.126 2.762-1.708 4.333-1.54M4.773 6.64v2.427h1.014V4.213H4.773V6.64m2.226-2.393c-.007.018-.01 1.107-.006 2.42L7 9.053l.5.008.5.007V4.213h-.494c-.371 0-.498.009-.507.034m6.343 4.613c.614.356 1.116.658 1.117.672 0 .014-.133.102-.295.195l-.296.17-1.147-.661c-.631-.363-1.138-.669-1.128-.679.037-.036.58-.342.607-.343.015 0 .529.291 1.142.646m-1.637.945c.63.363 1.139.668 1.133.678-.007.011-.151.1-.322.198-.259.148-.319.173-.366.15-.2-.096-2.209-1.279-2.208-1.299.002-.019.561-.369.612-.383.004-.001.522.294 1.151.656m-1.132 1.272 1.12.65.007 1.323c.004.728.001 1.323-.006 1.323s-.523-.295-1.147-.656l-1.134-.656v-1.317c0-.725.009-1.317.02-1.317.011 0 .524.293 1.14.65m4.414.667v1.317l-1.134.656c-.624.361-1.14.656-1.147.656-.007 0-.01-.595-.006-1.323l.007-1.323 1.12-.65c.616-.357 1.129-.65 1.14-.65.011 0 .02.592.02 1.317'
      />
    </svg>
  )
})

SvgOnHold16.displayName = 'SvgOnHold16'
export default SvgOnHold16

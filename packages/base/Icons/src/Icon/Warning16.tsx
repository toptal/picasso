import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import { classes } from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgWarning16 = forwardRef(function SvgWarning16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const classNames = ['PicassoSvgWarning16', classes.root]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (classes[colorClassName]) {
    classNames.push(classes[colorClassName])
  }
  if (className) {
    classNames.push(className)
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 16 16'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M6.78 1.707c.54-.943 1.91-.943 2.45 0l6.423 11.2c.536.934-.144 2.093-1.225 2.093H1.582C.5 15-.178 13.84.357 12.907l6.422-11.2Zm1.633.462a.472.472 0 0 0-.817 0l-6.422 11.2a.467.467 0 0 0 .408.698h12.846c.36 0 .587-.387.408-.698l-6.423-11.2ZM7.5 4.4h1v6h-1v-6Zm1 7h-1v1h1v-1Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgWarning16.displayName = 'SvgWarning16'
export default SvgWarning16

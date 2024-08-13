import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import { classes } from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgBankWire24 = forwardRef(function SvgBankWire24(
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
  const classNames = ['PicassoSvgBankWire24', classes.root]
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
      viewBox='0 0 32 32'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M2 26h28v4H2v-4Zm1 1v2h26v-2H3ZM2 8l14-6 14 6v3H2V8Zm1 .66V10h26V8.66L16 3.087 3 8.659ZM4 12h6v13H4V12Zm1 1v11h4V13H5Zm8-1h6v13h-6V12Zm1 1v11h4V13h-4Zm8-1h6v13h-6V12Zm1 1v11h4V13h-4Z' />
    </svg>
  )
})

SvgBankWire24.displayName = 'SvgBankWire24'
export default SvgBankWire24

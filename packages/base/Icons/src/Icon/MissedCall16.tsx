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
const SvgMissedCall16 = forwardRef(function SvgMissedCall16(
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
  const classNames = ['PicassoSvgMissedCall16', classes.root]
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
        d='M11 1h4v4h-1V2.723L8.003 8.72 1.285 2.003l.707-.708 6.01 6.01L13.308 2H11V1ZM1.275 11.366a17.252 17.252 0 0 1 13.447-.004 2.11 2.11 0 0 1 1.27 1.787l.007.17.001 1.684c0 .51-.372.93-.853.988l-.113.007-2.748.002a.977.977 0 0 1-.96-.879l-.007-.116-.001-1.22-.222-.036a18.97 18.97 0 0 0-5.682-.078l-.732.113v1.22c0 .51-.372.93-.853.987l-.113.007L.968 16a.977.977 0 0 1-.96-.879L0 15.005 0 13.322a2.11 2.11 0 0 1 1.275-1.956Zm13.057.918a16.25 16.25 0 0 0-12.273-.158l-.395.16c-.36.152-.61.496-.656.899L1 13.32 1.001 15l2.681-.003v-2.066l1.055-.169a19.939 19.939 0 0 1 5.977-.082l.541.081 1.062.172.001 2.066L15 14.997l-.001-1.677c0-.414-.215-.786-.55-.979l-.117-.057Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgMissedCall16.displayName = 'SvgMissedCall16'
export default SvgMissedCall16

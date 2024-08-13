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
const SvgPreview16 = forwardRef(function SvgPreview16(
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
  const classNames = ['PicassoSvgPreview16', classes.root]
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
        d='M.1 0h3v1h-2v2h-1V0Zm12 0h3v3h-1V1h-2V0Zm-11 12h-1v3h3v-1h-2v-2Zm13 2v-2h1v3h-3v-1h2ZM1.176 7.5c.056.09.13.205.223.336.248.35.63.82 1.158 1.29C3.61 10.062 5.247 11 7.6 11c2.354 0 3.99-.938 5.043-1.874.529-.47.91-.94 1.158-1.29.094-.131.168-.246.223-.336a6.276 6.276 0 0 0-.223-.336c-.248-.35-.63-.82-1.158-1.29C11.59 4.938 9.953 4 7.6 4c-2.354 0-3.99.938-5.043 1.874-.528.47-.91.94-1.158 1.29a6.285 6.285 0 0 0-.223.336Zm13.424 0 .447-.224-.447.224Zm.447-.224-.001-.002-.002-.004-.006-.012a2.724 2.724 0 0 0-.103-.184 6.99 6.99 0 0 0-.318-.488c-.283-.4-.713-.93-1.31-1.46C12.11 4.062 10.247 3 7.6 3 4.954 3 3.09 4.062 1.893 5.126a8.693 8.693 0 0 0-1.31 1.46 7.005 7.005 0 0 0-.42.672l-.007.012-.002.004v.001S.152 7.276.6 7.5l-.447-.224L.04 7.5l.112.224.056-.028L.6 7.5l-.447.224.001.002.002.004.006.012a2.748 2.748 0 0 0 .103.184c.07.12.176.288.318.488.283.4.714.93 1.31 1.46C3.09 10.938 4.953 12 7.6 12c2.646 0 4.51-1.062 5.707-2.126a8.688 8.688 0 0 0 1.31-1.46 6.99 6.99 0 0 0 .42-.672l.007-.012.002-.004v-.001s.001-.001-.446-.225l.447.224.112-.224-.112-.224ZM7.6 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM5.1 7.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgPreview16.displayName = 'SvgPreview16'
export default SvgPreview16

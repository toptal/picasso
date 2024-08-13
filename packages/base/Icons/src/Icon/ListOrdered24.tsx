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
const SvgListOrdered24 = forwardRef(function SvgListOrdered24(
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
  const classNames = ['PicassoSvgListOrdered24', classes.root]
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
      viewBox='0 0 24 24'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M4.044 18.261c.588 0 1.044.116 1.369.347.324.23.486.542.486.934 0 .266-.1.496-.297.69-.199.193-.44.313-.725.36.28.028.533.141.76.34.226.198.339.453.339.766 0 .41-.177.744-.532 1.001-.355.257-.821.385-1.4.385-.43 0-.81-.068-1.144-.203-.334-.135-.597-.313-.788-.532l.609-.819.1.09c.14.116.303.207.492.274.235.084.463.126.682.126.252 0 .446-.042.581-.126.135-.084.203-.194.203-.329a.313.313 0 0 0-.185-.297c-.124-.063-.34-.095-.648-.095h-.132l-.22.001c-.156.001-.249.003-.278.006v-1.07h.035c.06.003.167.005.324.006h.271l.144-.004c.408-.021.612-.141.612-.36 0-.14-.072-.246-.217-.318a1.27 1.27 0 0 0-.567-.109c-.439 0-.826.15-1.162.448l-.581-.756.127-.131c.436-.417 1.017-.625 1.742-.625ZM23 20.001v1H9v-1h14ZM4.044 10.26c.555 0 1.01.142 1.362.427.352.285.528.66.528 1.127 0 .35-.13.69-.392 1.022-.261.331-.688.702-1.281 1.113h1.708V15H2.308v-.938l.216-.156c.912-.661 1.5-1.113 1.762-1.356.282-.261.423-.506.423-.735a.415.415 0 0 0-.185-.36.78.78 0 0 0-.459-.13c-.467 0-.882.17-1.246.511l-.665-.798.149-.149c.206-.188.443-.333.712-.435a2.86 2.86 0 0 1 1.029-.193ZM23 12.001v1H9v-1h14ZM4.709 2.33V7H3.505V3.871l-.784.791-.686-.721 1.631-1.61h1.043ZM23 4v1H9V4h14Z' />
    </svg>
  )
})

SvgListOrdered24.displayName = 'SvgListOrdered24'
export default SvgListOrdered24

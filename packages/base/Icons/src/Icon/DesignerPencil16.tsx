import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgDesignerPencil16',
})
const SvgDesignerPencil16 = forwardRef(function SvgDesignerPencil16(
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
  const classes: Record<string, string> = useStyles(props)
  const classNames = [classes.root, className]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (classes[colorClassName]) {
    classNames.push(classes[colorClassName])
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
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M7.924 1.235 7.5.557l-.424.678-5 8-.21.337.28.28v.001l.002.002.012.013.055.059c.048.054.12.136.207.245.174.218.409.54.644.951.471.825.934 1.989.934 3.377V16h1v-1.5c0-.17-.006-.336-.017-.5h5.034c-.011.164-.017.33-.017.5V16h1v-1.5c0-1.388.463-2.552.934-3.377.235-.411.47-.733.644-.951a5.363 5.363 0 0 1 .262-.304l.012-.013.002-.001v-.001l.28-.28-.21-.338-5-8Zm3.142 9.392a8.165 8.165 0 0 0-.91 2.373H4.844a8.46 8.46 0 0 0-1.722-3.552L7 3.243v4.842a1.5 1.5 0 1 0 1 0V3.243l3.878 6.205a8.45 8.45 0 0 0-.812 1.18Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgDesignerPencil16.displayName = 'SvgDesignerPencil16'
export default SvgDesignerPencil16

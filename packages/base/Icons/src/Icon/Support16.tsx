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
  name: 'PicassoSvgSupport16',
})
const SvgSupport16 = forwardRef(function SvgSupport16(
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
        d='M13.996 5.775A6 6 0 0 0 2 6H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3V6H3l.005-.217A5 5 0 0 1 13 6h-1v5h1v2.5l-.008.09a.5.5 0 0 1-.492.41h-1.585A1.5 1.5 0 0 0 9.5 13h-1a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 0 1.415-1H12.5l.145-.007A1.5 1.5 0 0 0 14 13.5V11h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1l-.004-.225ZM10 14.5a.5.5 0 0 0-.41-.492L9.5 14h-1a.5.5 0 0 0-.09.992L8.5 15h1a.5.5 0 0 0 .5-.5ZM3 7v3H1V7h2Zm10 3V7h2v3h-2Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgSupport16.displayName = 'SvgSupport16'
export default SvgSupport16

/* eslint-disable import/no-extraneous-dependencies */
import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import kebabToCamelCase from '@toptal/picasso-utils/kebab-to-camel-case'

import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgUnlink16',
})
const SvgUnlink16 = forwardRef(function SvgUnlink16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='m13.5 1.793.707.707L2.5 14.207l-.707-.707L13.5 1.793ZM13 6a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H8a2.99 2.99 0 0 1-2.06-.818l.708-.708C7.004 11.8 7.478 12 8 12h5a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1.879l1-1H13ZM8 3a2.99 2.99 0 0 1 2.06.82l-.708.706A1.993 1.993 0 0 0 8 4H3a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1.878l-1 1H3a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h5Zm2.996 4.126L11 7a3 3 0 0 1-2.875 2.997l2.871-2.871ZM7.874 6.003l-2.87 2.871.001-.05a3 3 0 0 1 2.87-2.821Z' />
    </svg>
  )
})

SvgUnlink16.displayName = 'SvgUnlink16'
export default SvgUnlink16

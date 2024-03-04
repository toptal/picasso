import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgPortfolioFinance24',
})
const SvgPortfolioFinance24 = forwardRef(function SvgPortfolioFinance24(
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M1.106 15.447 12 20.882l10.894-5.435L24 16l-12 6-12-6 1.106-.553Zm0-4L12 16.882l10.894-5.435L24 12l-12 6-12-6 1.106-.553ZM0 8l12-6 12 6-12 6L0 8Zm12 4.882L21.764 8 12 3.118 2.236 8 12 12.882Z' />
    </svg>
  )
})

SvgPortfolioFinance24.displayName = 'SvgPortfolioFinance24'
export default SvgPortfolioFinance24

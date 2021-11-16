import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgSupport16' })
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
    'data-testid': testId
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
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      fill='none'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.996 5.775A6 6 0 002 6H1a1 1 0 00-1 1v3a1 1 0 001 1h3V6H3l.005-.217A5 5 0 0113 6h-1v5h1v2.5l-.008.09a.5.5 0 01-.492.41h-1.585A1.5 1.5 0 009.5 13h-1a1.5 1.5 0 000 3h1a1.5 1.5 0 001.415-1H12.5l.145-.007A1.5 1.5 0 0014 13.5V11h1a1 1 0 001-1V7a1 1 0 00-1-1h-1l-.004-.225zM10 14.5a.5.5 0 00-.41-.492L9.5 14h-1a.5.5 0 00-.09.992L8.5 15h1a.5.5 0 00.5-.5zM3 7v3H1V7h2zm10 3V7h2v3h-2z'
      />
    </svg>
  )
})

SvgSupport16.displayName = 'SvgSupport16'
export default SvgSupport16

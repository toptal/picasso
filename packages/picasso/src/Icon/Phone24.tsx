import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgPhone24',
})
const SvgPhone24 = forwardRef(function SvgPhone24(
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
      <path d='M20.628 22.006a3.377 3.377 0 0 1-3.7.73A29.165 29.165 0 0 1 1.264 7.079a3.386 3.386 0 0 1 .728-3.704l1.905-1.908a1.59 1.59 0 0 1 2.252 0l3.203 3.198c.622.623.622 1.63 0 2.253L7.97 8.3l.217.3a32.107 32.107 0 0 0 7.216 7.215l.295.215 1.38-1.381a1.59 1.59 0 0 1 2.251-.001l3.204 3.198c.621.623.621 1.63 0 2.253l-1.906 1.907Zm-3.313-.192c.893.375 1.92.172 2.606-.514l1.905-1.908a.593.593 0 0 0 .001-.838l-3.204-3.2a.59.59 0 0 0-.836.001L15.8 17.343l-.692-.505-.29-.213A33.101 33.101 0 0 1 7.38 9.188l-.72-.99 1.984-1.987a.593.593 0 0 0 .001-.838l-3.204-3.2a.59.59 0 0 0-.836.001L2.7 4.082a2.386 2.386 0 0 0-.514 2.611 28.166 28.166 0 0 0 15.129 15.12Z' />
    </svg>
  )
})

SvgPhone24.displayName = 'SvgPhone24'
export default SvgPhone24

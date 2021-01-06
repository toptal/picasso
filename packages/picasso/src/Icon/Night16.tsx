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
const useStyles = makeStyles(styles, { name: 'PicassoSvgNight16' })
const SvgNight16 = forwardRef(function SvgNight16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    classes: externalClasses
  } = props
  const classes: Record<string, string> = useStyles({
    classes: externalClasses
  })
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
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M14 9V8h1v1h1v1h-1v1h-1v-1h-1V9h1zm-2-7V0h1v2h2v1h-2v2h-1V3h-2V2h2zM5.346 6.667c0 3.79 2.96 6.878 6.654 6.996A6.803 6.803 0 016.874 16C3.077 16 0 12.866 0 9s3.077-7 6.874-7c.073 0 .146.001.22.004a7.047 7.047 0 00-1.748 4.663zm-1 0c0-1.19.257-2.34.736-3.383C2.716 4.057 1 6.322 1 9c0 3.318 2.634 6 5.874 6a5.758 5.758 0 002.84-.747c-3.127-1.065-5.368-4.067-5.368-7.586z' />
    </svg>
  )
})

SvgNight16.displayName = 'SvgNight16'
export default SvgNight16

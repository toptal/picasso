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
const useStyles = makeStyles(styles, { name: 'PicassoSvgConfluence24' })
const SvgConfluence24 = forwardRef(function SvgConfluence24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, color, scale, base } = props
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M.9 17.6c4.3-7.1 10-7.3 16.7-4.1.3.1.5.2.7.3l.7.3 3.6 1.8c.3.1.5.6.3 1l-2.3 5.3c-.2.4-.6.5-1 .4l-5-2.4c-3.5-1.7-5.5-2-7.5 1.2-.3.5-.5.9-.7 1.2-.2.4-.7.5-1.1.3L.4 19.8c-.4-.2-.5-.6-.3-1s.5-.8.8-1.2zM17.6.4c.2-.4.7-.5 1.1-.3l4.9 3.1c.4.2.5.6.3 1s-.5.8-.8 1.2c-4.3 7.1-10 7.3-16.7 4.1-1.9-.9-3.9-1.9-5-2.4-.3-.1-.5-.6-.3-1L3.4.8c.2-.4.6-.5 1-.4l5 2.4c3.5 1.7 5.5 2 7.5-1.2.3-.5.5-.9.7-1.2z' />
    </svg>
  )
})

SvgConfluence24.displayName = 'SvgConfluence24'
export default SvgConfluence24

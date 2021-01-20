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
const useStyles = makeStyles(styles, { name: 'PicassoSvgAbstract24' })
const SvgAbstract24 = forwardRef(function SvgAbstract24(
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
      <path d='M12.3 0C21.7.1 24 2.5 24 12c0 9.6-2.4 12-12 12S0 21.6 0 12v-.3C.1 2.3 2.5 0 12 0zm-.5 9.7c-1.7-.7-3.7-.3-5 1-1.3 1.3-1.7 3.3-1 5 .7 1.7 2.4 2.9 4.2 2.9 2.6 0 4.6-2.1 4.6-4.6 0-1.9-1.1-3.6-2.8-4.3zm6.6-4.1H5.6v2.3h10.5v10.5h2.3V5.6zm-8.4 6c1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.3-2.4 2.3-1.3 0-2.3-1-2.3-2.3 0-1.3 1-2.4 2.3-2.4z' />
    </svg>
  )
})

SvgAbstract24.displayName = 'SvgAbstract24'
export default SvgAbstract24

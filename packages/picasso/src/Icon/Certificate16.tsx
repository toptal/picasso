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
const useStyles = makeStyles(styles, { name: 'PicassoSvgCertificate16' })
const SvgCertificate16 = forwardRef(function SvgCertificate16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M14 10.663a3.486 3.486 0 01-1.5.337c-.537 0-1.045-.12-1.5-.337v3.165l1.5-.45 1.5.45v-3.165zm1-.714v5.223l-2.5-.75-2.5.75V9.949a3.5 3.5 0 115 0zM1 16H0V0h13v3h-1V1H1v14h8v1H1zm11.5-6a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' />
    </svg>
  )
})

SvgCertificate16.displayName = 'SvgCertificate16'
export default SvgCertificate16

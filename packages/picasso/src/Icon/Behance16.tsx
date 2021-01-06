import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps, JssProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgBehance16' })
const SvgBehance16 = forwardRef(function SvgBehance16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, color, scale, base } = props
  const classes: Record<string, string> = useStyles()
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
      <path d='M4.627 3c.468 0 .894.04 1.28.125.385.087.714.22.991.407.273.187.489.434.64.747.15.314.227.7.227 1.154 0 .493-.113.907-.338 1.24-.226.334-.558.6-1.002.814.604.173 1.051.48 1.349.914.298.44.443.967.443 1.574 0 .5-.087.927-.273 1.287a2.468 2.468 0 01-.774.9c-.32.232-.7.4-1.114.512-.406.11-.835.17-1.273.17H0v-9.84h4.627V3zm6.67 8.111c.294.286.716.429 1.264.429.393 0 .733-.099 1.02-.298.283-.194.454-.407.52-.627h1.726c-.268.854-.699 1.467-1.267 1.834-.567.373-1.256.554-2.054.554a4.088 4.088 0 01-1.515-.267 3.3 3.3 0 01-1.147-.76 3.402 3.402 0 01-.718-1.181 4.376 4.376 0 01-.25-1.514c0-.535.09-1.027.27-1.487.18-.467.429-.854.746-1.194.33-.34.71-.597 1.158-.796.45-.2.934-.289 1.48-.289.608 0 1.128.11 1.588.349.447.227.814.547 1.107.933.294.391.5.84.627 1.348.127.5.167 1.027.14 1.587h-5.128c0 .56.186 1.088.473 1.377l-.053.02.014-.018zm-6.829.033c.212 0 .414-.02.605-.062.193-.04.365-.11.508-.2.14-.09.26-.218.347-.388.087-.16.127-.38.127-.64 0-.5-.147-.861-.427-1.081-.287-.214-.66-.32-1.127-.32h-2.34v2.7h2.307v-.02.011zm9.075-3.768c-.235-.256-.627-.394-1.105-.394-.312 0-.57.049-.778.158a1.437 1.437 0 00-.754.894c-.05.173-.08.333-.09.473h3.175c-.046-.5-.22-.867-.453-1.127v.007l.005-.01zm-9.195-.41c.383 0 .7-.09.95-.275.25-.18.37-.48.37-.892 0-.23-.047-.417-.12-.564a.975.975 0 00-.333-.342c-.14-.082-.3-.14-.48-.171a2.952 2.952 0 00-.56-.05h-2.02v2.295h2.193zm6.068-3.306h3.98v.97h-3.98v-.978.008z' />
    </svg>
  )
})

SvgBehance16.displayName = 'SvgBehance16'
export default SvgBehance16

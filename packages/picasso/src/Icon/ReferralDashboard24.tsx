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
const useStyles = makeStyles(styles, { name: 'PicassoSvgReferralDashboard24' })
const SvgReferralDashboard24 = forwardRef(function SvgReferralDashboard24(
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
      <path d='M2.894 16.14a10.015 10.015 0 007.317 5.7l-.178.985a11.016 11.016 0 01-8.05-6.271l.911-.415zM17.5 9a4.5 4.5 0 012.168 8.444 5.5 5.5 0 013.328 4.835L23 22.5h-1a4.5 4.5 0 00-8.995-.212L13 22.5h-1a5.501 5.501 0 013.333-5.057A4.5 4.5 0 0117.5 9zm0 1a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm-11-9a4.5 4.5 0 012.168 8.444 5.5 5.5 0 013.328 4.835L12 14.5h-1a4.5 4.5 0 00-8.995-.212L2 14.5H1a5.501 5.501 0 013.333-5.057A4.5 4.5 0 016.5 1zM12 1c5.073 0 9.344 3.434 10.615 8.105l-.965.264C20.496 5.123 16.612 2 12 2V1zM6.5 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7z' />
    </svg>
  )
})

SvgReferralDashboard24.displayName = 'SvgReferralDashboard24'
export default SvgReferralDashboard24

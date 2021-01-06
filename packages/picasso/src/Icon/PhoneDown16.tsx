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
const useStyles = makeStyles(styles, { name: 'PicassoSvgPhoneDown16' })
const SvgPhoneDown16 = forwardRef(function SvgPhoneDown16(
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
      <path d='M14.721 6.362a2.11 2.11 0 011.271 1.787l.007.17.001 1.684c0 .51-.373.93-.853.988l-.113.007-2.748.002a.977.977 0 01-.96-.879l-.007-.116-.001-1.22-.222-.036a18.97 18.97 0 00-5.682-.078l-.732.113v1.22c0 .51-.372.93-.853.987l-.113.007L.968 11a.977.977 0 01-.96-.879L0 10.005 0 8.322a2.11 2.11 0 011.275-1.957 17.252 17.252 0 0113.446-.003zM2.06 7.126l-.395.16c-.36.152-.61.496-.656.899L1 8.32 1.001 10l2.681-.003V7.931l1.055-.169a19.942 19.942 0 015.977-.082l.541.081 1.062.172.001 2.066L15 9.997l-.001-1.677c0-.414-.216-.786-.55-.979l-.117-.057A16.249 16.249 0 002.06 7.126z' />
    </svg>
  )
})

SvgPhoneDown16.displayName = 'SvgPhoneDown16'
export default SvgPhoneDown16

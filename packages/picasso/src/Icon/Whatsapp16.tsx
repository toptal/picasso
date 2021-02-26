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
const useStyles = makeStyles(styles, { name: 'PicassoSvgWhatsapp16' })
const SvgWhatsapp16 = forwardRef(function SvgWhatsapp16(
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
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M13.604 2.325A7.869 7.869 0 007.996 0a7.937 7.937 0 00-6.871 11.893L0 16l4.204-1.104a7.904 7.904 0 003.789.965h.003c4.368 0 8.004-3.557 8.004-7.929 0-2.118-.9-4.107-2.396-5.607zm-5.608 12.2a6.578 6.578 0 01-3.357-.918l-.239-.143-2.493.654.664-2.432-.157-.25a6.568 6.568 0 01-1.007-3.507c0-3.633 2.957-6.59 6.593-6.59 1.76 0 3.414.686 4.657 1.932 1.243 1.247 2.007 2.9 2.004 4.661 0 3.636-3.032 6.593-6.665 6.593zm3.615-4.936c-.197-.1-1.172-.578-1.354-.643-.182-.067-.314-.1-.446.1s-.511.643-.629.779c-.114.132-.232.15-.428.05-1.165-.582-1.929-1.04-2.697-2.357-.203-.35.204-.325.582-1.082.065-.132.032-.247-.018-.347-.05-.1-.446-1.075-.61-1.471-.161-.386-.325-.332-.447-.34-.114-.007-.246-.007-.378-.007a.734.734 0 00-.529.247c-.182.2-.693.678-.693 1.653s.711 1.918.807 2.05c.1.133 1.397 2.133 3.386 2.993 1.257.543 1.75.59 2.379.497.382-.057 1.171-.479 1.335-.943.165-.464.165-.86.115-.943-.047-.09-.179-.14-.375-.236z' />
    </svg>
  )
})

SvgWhatsapp16.displayName = 'SvgWhatsapp16'
export default SvgWhatsapp16

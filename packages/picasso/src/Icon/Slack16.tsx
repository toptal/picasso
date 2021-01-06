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
const useStyles = makeStyles(styles, { name: 'PicassoSvgSlack16' })
const SvgSlack16 = forwardRef(function SvgSlack16(
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
      <path d='M3.361 10.11c0 .926-.755 1.681-1.68 1.681-.925 0-1.681-.755-1.681-1.68C0 9.186.756 8.43 1.68 8.43h1.681v1.68zm.848 0c0-.924.755-1.68 1.68-1.68.925 0 1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68-.926 0-1.681-.756-1.681-1.68v-4.21zm1.68-6.749c-.925 0-1.68-.755-1.68-1.68C4.209.756 4.964 0 5.889 0 6.814 0 7.57.756 7.57 1.68v1.681H5.89zm0 .848c.925 0 1.681.755 1.681 1.68 0 .925-.756 1.681-1.68 1.681H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.681 1.68-1.681h4.21zm6.75 1.68c0-.925.755-1.68 1.68-1.68.925 0 1.681.755 1.681 1.68 0 .925-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .925-.755 1.681-1.68 1.681-.925 0-1.681-.756-1.681-1.68V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.68 6.75c.925 0 1.68.755 1.68 1.68 0 .925-.755 1.681-1.68 1.681-.925 0-1.681-.756-1.681-1.68v-1.681h1.68zm0-.848c-.925 0-1.681-.755-1.681-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z' />
    </svg>
  )
})

SvgSlack16.displayName = 'SvgSlack16'
export default SvgSlack16

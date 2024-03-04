import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgSlack24',
})
const SvgSlack24 = forwardRef(function SvgSlack24(
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
      <path d='M5.042 15.166a2.527 2.527 0 0 1-2.52 2.521A2.527 2.527 0 0 1 0 15.167a2.527 2.527 0 0 1 2.521-2.522h2.521v2.521Zm1.27 0a2.527 2.527 0 0 1 2.522-2.521 2.527 2.527 0 0 1 2.521 2.521v6.313A2.527 2.527 0 0 1 8.834 24a2.527 2.527 0 0 1-2.521-2.521v-6.313ZM8.835 5.042a2.527 2.527 0 0 1-2.521-2.52A2.527 2.527 0 0 1 8.833 0a2.527 2.527 0 0 1 2.522 2.521v2.521H8.834Zm0 1.27a2.527 2.527 0 0 1 2.521 2.522 2.527 2.527 0 0 1-2.521 2.521H2.52A2.527 2.527 0 0 1 0 8.834a2.527 2.527 0 0 1 2.521-2.521h6.313Zm10.124 2.522a2.527 2.527 0 0 1 2.52-2.521A2.527 2.527 0 0 1 24 8.833a2.527 2.527 0 0 1-2.521 2.522h-2.521V8.834Zm-1.27 0a2.527 2.527 0 0 1-2.522 2.521 2.527 2.527 0 0 1-2.521-2.521V2.52A2.527 2.527 0 0 1 15.166 0a2.527 2.527 0 0 1 2.521 2.521v6.313Zm-2.522 10.124a2.527 2.527 0 0 1 2.521 2.52A2.527 2.527 0 0 1 15.167 24a2.527 2.527 0 0 1-2.522-2.521v-2.521h2.521Zm0-1.27a2.527 2.527 0 0 1-2.521-2.522 2.527 2.527 0 0 1 2.521-2.521h6.313A2.527 2.527 0 0 1 24 15.166a2.527 2.527 0 0 1-2.521 2.521h-6.313Z' />
    </svg>
  )
})

SvgSlack24.displayName = 'SvgSlack24'
export default SvgSlack24

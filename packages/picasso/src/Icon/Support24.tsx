import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgSupport24',
})
const SvgSupport24 = forwardRef(function SvgSupport24(
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
      fill='none'
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M12 0a9 9 0 0 1 8.996 8.735L21 9h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2v3.5a1.5 1.5 0 0 1-1.355 1.493L19.5 22h-3.585a1.5 1.5 0 0 1-1.415 1h-2a1.5 1.5 0 0 1 0-3h2a1.5 1.5 0 0 1 1.415 1H19.5a.5.5 0 0 0 .492-.41L20 20.5V17h-1V9h1a8 8 0 0 0-15.996-.25L4 9h1v8H1a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h2a9 9 0 0 1 9-9ZM4 10v6H1v-6h3Zm16 6v-6h3v6h-3Zm-5.5 5h-2a.5.5 0 0 0-.09.992l.09.008h2a.5.5 0 0 0 .09-.992L14.5 21Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgSupport24.displayName = 'SvgSupport24'
export default SvgSupport24

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
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgSubfunction24',
})
const SvgSubfunction24 = forwardRef(function SvgSubfunction24(
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
        clipRule='evenodd'
        d='M8.348 0h7.304v7.304h-3.13v4.174h8.348v5.255a3.653 3.653 0 1 1-1.044 0v-4.211H4.174v4.174h3.13V24H0v-7.304h3.13v-5.218h8.348V7.304h-3.13V0Zm3.13 6.26h3.13V1.044H9.392v5.218h2.087ZM6.261 22.958v-5.218H1.043v5.218h5.218Zm14.087-5.218a2.609 2.609 0 1 1 0 5.218 2.609 2.609 0 0 1 0-5.218Z'
        fill='currentColor'
      />
    </svg>
  )
})

SvgSubfunction24.displayName = 'SvgSubfunction24'
export default SvgSubfunction24

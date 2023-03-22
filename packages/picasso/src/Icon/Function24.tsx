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
  name: 'PicassoSvgFunction24',
})
const SvgFunction24 = forwardRef(function SvgFunction24(
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
        d='M12 0a3.652 3.652 0 0 0-.522 7.267v4.211H3.13v5.218H0V24h7.304v-7.304h-3.13v-4.174h15.652v4.174h-3.13V24H24v-7.304h-3.13v-5.218h-8.348v-4.21A3.653 3.653 0 0 0 12 0Zm0 6.26a2.609 2.609 0 1 0 0-5.217 2.609 2.609 0 0 0 0 5.218ZM6.26 22.958v-5.218H1.044v5.218h5.218Zm16.697 0v-5.218h-5.218v5.218h5.217Z'
        fill='currentColor'
      />
    </svg>
  )
})

SvgFunction24.displayName = 'SvgFunction24'
export default SvgFunction24

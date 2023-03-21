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
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgImage16',
})
const SvgImage16 = forwardRef(function SvgImage16(
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
      viewBox='0 0 16 16'
      fill='none'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 1H16V14H0V1ZM1 2V13H15V2H1Z'
        fill='#455065'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M12.5 3.79297L15.8535 7.14652L15.1464 7.85363L12.5 5.20718L6.59868 11.1085L4.55274 10.0855L0.799951 12.9001L0.199951 12.1001L4.44717 8.91467L6.40123 9.8917L12.5 3.79297Z'
        fill='#455065'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M5 5C4.44772 5 4 5.44772 4 6C4 6.55228 4.44772 7 5 7C5.55228 7 6 6.55228 6 6C6 5.44772 5.55228 5 5 5ZM3 6C3 4.89543 3.89543 4 5 4C6.10457 4 7 4.89543 7 6C7 7.10457 6.10457 8 5 8C3.89543 8 3 7.10457 3 6Z'
        fill='#455065'
      />
    </svg>
  )
})

SvgImage16.displayName = 'SvgImage16'
export default SvgImage16

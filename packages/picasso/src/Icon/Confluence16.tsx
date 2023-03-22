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
  name: 'PicassoSvgConfluence16',
})
const SvgConfluence16 = forwardRef(function SvgConfluence16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='m15.602 3.658-.182.3c-2.9 4.713-6.69 4.858-11.161 2.694A400.116 400.116 0 0 0 .949 5.08a.51.51 0 0 1-.254-.667L2.27.848a.51.51 0 0 1 .684-.255l3.272 1.553c2.378 1.135 3.696 1.4 5.007-.764.133-.22.258-.428.366-.61l.123-.207a.51.51 0 0 1 .726-.168l3.31 2.037a.51.51 0 0 1 .17.692c-.102.16-.215.347-.327.532ZM.398 12.348l.182-.301c2.9-4.718 6.69-4.858 11.15-2.691 1.24.598 2.618 1.247 3.31 1.573a.509.509 0 0 1 .255.667L13.72 15.16a.51.51 0 0 1-.685.255l-3.281-1.56c-2.378-1.136-3.697-1.401-5.008.763l-.365.61-.124.207a.509.509 0 0 1-.705.173l-3.31-2.036a.51.51 0 0 1-.17-.693c.102-.16.215-.347.327-.532Z'
        fill='currentColor'
      />
    </svg>
  )
})

SvgConfluence16.displayName = 'SvgConfluence16'
export default SvgConfluence16

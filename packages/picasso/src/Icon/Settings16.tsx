import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps, mergeClasses } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgSettings16' })
const SvgSettings16 = forwardRef(function SvgSettings16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: externalClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes: Record<string, string> = mergeClasses(
    useStyles(props),
    externalClasses
  )
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
      <path d='M6 2.341V0h4v2.341a5.994 5.994 0 011.9 1.098l2.028-1.171 2 3.464L13.9 6.903a6.034 6.034 0 010 2.194l2.028 1.17-2 3.465-2.029-1.171A5.994 5.994 0 0110 13.659V16H6v-2.341a5.994 5.994 0 01-1.9-1.098l-2.028 1.171-2-3.464L2.1 9.097a6.034 6.034 0 010-2.194L.072 5.733l2-3.465L4.1 3.439A5.994 5.994 0 016 2.341zM7 1v2.049l-.667.235a4.993 4.993 0 00-1.582.915l-.537.46-1.776-1.025-1 1.732L3.212 6.39l-.129.695a5.034 5.034 0 000 1.83l.129.695-1.774 1.024 1 1.732 1.776-1.025.537.46c.467.4 1.003.71 1.582.915L7 12.95V15h2v-2.049l.667-.235a4.993 4.993 0 001.582-.915l.537-.46 1.776 1.025 1-1.732-1.774-1.024.129-.695a5.034 5.034 0 000-1.83l-.129-.695 1.774-1.024-1-1.732-1.776 1.025-.537-.46a4.993 4.993 0 00-1.582-.915L9 3.05V1H7zm1 10a3 3 0 110-6 3 3 0 010 6zm0-1a2 2 0 100-4 2 2 0 000 4z' />
    </svg>
  )
})

SvgSettings16.displayName = 'SvgSettings16'
export default SvgSettings16

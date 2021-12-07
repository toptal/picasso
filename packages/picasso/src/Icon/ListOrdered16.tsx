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
const useStyles = makeStyles(styles, { name: 'PicassoSvgListOrdered16' })
const SvgListOrdered16 = forwardRef(function SvgListOrdered16(
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
      <path d='M2.752 11.938c.504 0 .895.099 1.173.297a.934.934 0 01.417.801.798.798 0 01-.255.591c-.17.166-.377.269-.621.309.24.024.457.121.651.291.194.17.291.389.291.657 0 .352-.152.638-.456.858-.304.22-.704.33-1.2.33-.368 0-.695-.058-.981-.174a1.747 1.747 0 01-.675-.456l.522-.702.108.096c.115.09.248.162.399.216.202.072.397.108.585.108.216 0 .382-.036.498-.108.116-.072.174-.166.174-.282a.268.268 0 00-.159-.255c-.106-.054-.291-.081-.555-.081h-.24c-.171.001-.271.003-.3.006v-.918l.03.002c.076.003.246.004.51.004.432 0 .648-.104.648-.312 0-.12-.062-.211-.186-.273a1.09 1.09 0 00-.486-.093c-.376 0-.708.128-.996.384l-.498-.648.12-.123c.372-.35.866-.525 1.482-.525zM15 14v1H6v-1h9zM2.752 5.938c.476 0 .865.122 1.167.366.302.244.453.566.453.966 0 .3-.112.592-.336.876-.224.284-.59.602-1.098.954h1.464v.9H1.264v-.804l.2-.144c.773-.561 1.272-.945 1.495-1.152.242-.224.363-.434.363-.63a.356.356 0 00-.159-.309.67.67 0 00-.393-.111c-.4 0-.756.146-1.068.438l-.57-.684.127-.128c.177-.16.38-.285.611-.373.288-.11.582-.165.882-.165zM15 8v1H6V8h9zM3.322-.002V4H2.29V1.318l-.672.678-.588-.618 1.398-1.38h.894zM15 2v1H6V2h9z' />
    </svg>
  )
})

SvgListOrdered16.displayName = 'SvgListOrdered16'
export default SvgListOrdered16

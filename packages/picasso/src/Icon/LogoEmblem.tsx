import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
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
const SvgLogoEmblem = forwardRef(function SvgLogoEmblem(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: availableClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes = [availableClasses.root, className]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (availableClasses[colorClassName]) {
    classes.push(availableClasses[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 21 30'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path
        d='M8.185 0L21 12.958l-9.611 9.646 4.402 4.438L12.856 30 0 17l9.57-9.625-4.361-4.396L8.185 0zm4.01 10.708c-.066.017-.132.06-.23.152l-.08.078-5.457 5.5c-.165.145-.207.229-.227.312a.597.597 0 000 .27c.016.067.06.134.15.233l.077.08 1.736 1.75c.145.167.228.209.31.23.104.02.186.02.27 0a.488.488 0 00.242-.156l.067-.074 5.457-5.5c.165-.146.207-.229.227-.312a.597.597 0 000-.271c-.016-.067-.06-.133-.15-.232l-.077-.08-1.736-1.75c-.145-.167-.228-.209-.31-.23a.584.584 0 00-.27 0zM18.313 0c.744 0 1.385.27 1.902.792.516.52.785 1.166.785 1.916a2.59 2.59 0 01-.785 1.896 2.595 2.595 0 01-1.902.792c-.744 0-1.364-.25-1.88-.792a2.59 2.59 0 01-.786-1.896c0-.75.248-1.375.785-1.916A2.583 2.583 0 0118.313 0zm.02.438c-.62 0-1.157.229-1.57.666a2.178 2.178 0 00-.662 1.604c0 .625.207 1.167.641 1.604.434.438.95.667 1.592.667.62 0 1.157-.229 1.57-.667.435-.437.662-.979.662-1.604 0-.646-.227-1.166-.661-1.604-.435-.437-.951-.667-1.571-.667zm.187.791c.6 0 .93.354.93.833 0 .417-.31.73-.724.813l.724 1.313h-.496l-.724-1.292h-.475v1.292h-.434V1.228h1.199zm-.083.396h-.682v.896h.682c.372 0 .579-.146.579-.438 0-.312-.186-.458-.579-.458z'
        fillRule='evenodd'
      />
    </svg>
  )
})

SvgLogoEmblem.displayName = 'SvgLogoEmblem'
export default withStyles(styles)(SvgLogoEmblem)

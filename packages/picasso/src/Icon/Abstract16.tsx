import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'
import { styled } from '@mui/material/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4

const PREFIX = 'PicassoIconAbsract16'

const classes: Record<string, string> = {
  root: `${PREFIX}-root`,
  green: `${PREFIX}-green`,
  darkGreen: `${PREFIX}-darkGreen`,
  red: `${PREFIX}-red`,
  lightBlue: `${PREFIX}-lightBlue`,
  blue: `${PREFIX}-blue`,
  yellow: `${PREFIX}-yellow`,
  white: `${PREFIX}-white`,
  lightGrey: `${PREFIX}-lightGrey`,
  grey: `${PREFIX}-grey`,
  darkGrey: `${PREFIX}-darkGrey`,
  black: `${PREFIX}-black`,
  invert: `${PREFIX}-invert`,
  inherit: `${PREFIX}-inherit`,
}

const StyledSvg = styled('svg')(({ theme: { palette } }) => ({
  [`${classes.root}`]: {
    fill: 'currentColor',
    display: 'inline-block',
    fontSize: 'inherit',
    height: '1em',
    verticalAlign: '-.125em',
  },

  // colors
  [`${classes.green}`]: {
    color: palette.green.main,
  },
  [`${classes.darkGreen}`]: {
    color: palette.green.dark,
  },
  [`${classes.red}`]: {
    color: palette.red.main,
  },
  [`${classes.lightBlue}`]: {
    color: palette.blue.light,
  },
  [`${classes.blue}`]: {
    color: palette.primary.main,
  },
  [`${classes.yellow}`]: {
    color: palette.yellow.main,
  },
  [`${classes.white}`]: {
    color: palette.common.white,
  },
  [`${classes.lightGrey}`]: {
    color: palette.grey.light2,
  },
  [`${classes.grey}`]: {
    color: palette.grey.main,
  },
  [`${classes.darkGrey}`]: {
    color: palette.text.primary,
  },
  [`${classes.black}`]: {
    color: palette.common.black,
  },
  [`${classes.invert}`]: {
    color: palette.common.white,
  },
  [`${classes.inherit}`]: {
    color: 'inherit',
  },
}))

export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgAbstract16 = forwardRef(function SvgAbstract16(
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
    <StyledSvg
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M8 0c6.4 0 8 1.6 8 8s-1.6 8-8 8-8-1.6-8-8 1.6-8 8-8Zm-.1 6.5c-1.2-.5-2.5-.2-3.4.6-.9.9-1.1 2.2-.6 3.4.4 1.1 1.5 1.9 2.8 1.9 1.7 0 3-1.4 3.1-3.1C9.8 8.1 9 7 7.9 6.5Zm4.4-2.7H3.8v1.5h7v7h1.5V3.8Zm-5.6 4c.8 0 1.5.7 1.6 1.5 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.5 1.6-1.5Z' />
    </StyledSvg>
  )
})

SvgAbstract16.displayName = 'SvgAbstract16'
export default SvgAbstract16

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
  name: 'PicassoSvgTriangleRightMinorSolid24',
})
const SvgTriangleRightMinorSolid24 = forwardRef(
  function SvgTriangleRightMinorSolid24(props: Props, ref: Ref<SVGSVGElement>) {
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
        <defs>
          <path id='triangleRightMinorSolid24_svg__a' d='m7 4 10 8-10 8z' />
        </defs>
        <g fill='none' fillRule='evenodd'>
          <mask id='triangleRightMinorSolid24_svg__b' fill='#fff'>
            <use xlinkHref='#triangleRightMinorSolid24_svg__a' />
          </mask>
          <use fill='#D8D8D8' xlinkHref='#triangleRightMinorSolid24_svg__a' />
          <g mask='url(#triangleRightMinorSolid24_svg__b)' fill='currentColor'>
            <path d='M0 0h24v24H0z' />
          </g>
        </g>
      </svg>
    )
  }
)

SvgTriangleRightMinorSolid24.displayName = 'SvgTriangleRightMinorSolid24'
export default SvgTriangleRightMinorSolid24

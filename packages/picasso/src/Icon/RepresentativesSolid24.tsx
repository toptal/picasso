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
  name: 'PicassoSvgRepresentativesSolid24',
})
const SvgRepresentativesSolid24 = forwardRef(function SvgRepresentativesSolid24(
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <defs>
        <path id='representativesSolid24_svg__a' d='M0 0v24l9-6.007L18 24V0z' />
      </defs>
      <g transform='translate(3)' fill='none' fillRule='evenodd'>
        <mask id='representativesSolid24_svg__b' fill='#fff'>
          <use xlinkHref='#representativesSolid24_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#representativesSolid24_svg__a'
        />
        <g mask='url(#representativesSolid24_svg__b)'>
          <path fill='currentColor' d='M-3 0h24v24H-3z' />
        </g>
      </g>
    </svg>
  )
})

SvgRepresentativesSolid24.displayName = 'SvgRepresentativesSolid24'
export default SvgRepresentativesSolid24

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
  name: 'PicassoSvgSoundOn16'
})
const SvgSoundOn16 = forwardRef(function SvgSoundOn16(
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
      <path d='M12.445 1.348c.435.291.841.625 1.212.995A7.975 7.975 0 0 1 16 8a7.975 7.975 0 0 1-3.234 6.426l-.32.226-.557-.83a7.037 7.037 0 0 0 1.06-.872A6.975 6.975 0 0 0 15 8a6.975 6.975 0 0 0-2.83-5.623l-.281-.198.556-.831ZM7 2v12l-3-3H0V5h4l3-3Zm3.778 1.842A4.985 4.985 0 0 1 13 8a4.985 4.985 0 0 1-2.021 4.016l-.2.142-.557-.831c.218-.146.421-.313.606-.499A3.985 3.985 0 0 0 12 8a3.985 3.985 0 0 0-1.565-3.174l-.213-.153.556-.83ZM6 4.414 4.414 6H1v4h3.414L6 11.585V4.414Zm3.112 1.923A2.007 2.007 0 0 1 10 8a1.995 1.995 0 0 1-.782 1.587l-.106.076-.557-.831A1.007 1.007 0 0 0 9 8c0-.27-.106-.52-.293-.707l-.073-.066-.079-.059.557-.83Z' />
    </svg>
  )
})

SvgSoundOn16.displayName = 'SvgSoundOn16'
export default SvgSoundOn16

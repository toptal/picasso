import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgSoundOn24',
})
const SvgSoundOn24 = forwardRef(function SvgSoundOn24(
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
        d='M20.485 3.515a12.056 12.056 0 0 0-1.818-1.494l-.556.831.355.248c.465.339.904.714 1.312 1.122A10.962 10.962 0 0 1 23 12c0 2.958-1.172 5.728-3.222 7.778-.51.51-1.068.969-1.667 1.37l.556.83.387-.27c.508-.369.987-.778 1.431-1.223A11.962 11.962 0 0 0 24 12c0-3.225-1.28-6.25-3.515-8.485Zm-2.828 2.828a8.035 8.035 0 0 0-1.212-.995l-.556.83.28.199A6.975 6.975 0 0 1 19 12a6.975 6.975 0 0 1-2.05 4.95 7.04 7.04 0 0 1-1.06.871l.556.831.321-.226c.315-.234.613-.491.89-.77A7.975 7.975 0 0 0 20 12c0-2.15-.853-4.167-2.343-5.657Zm-3.434 2.331A4.01 4.01 0 0 1 16 12a3.988 3.988 0 0 1-1.565 3.173l-.212.153-.557-.831A2.989 2.989 0 0 0 15 12a2.989 2.989 0 0 0-1.174-2.38l-.16-.115.557-.831ZM11 3v18l-5-5H0V8h6l5-5Zm-1 2.414L6.414 9H1v6h5.414L10 18.585V5.414Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgSoundOn24.displayName = 'SvgSoundOn24'
export default SvgSoundOn24

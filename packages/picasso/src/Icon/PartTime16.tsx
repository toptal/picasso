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
  name: 'PicassoSvgPartTime16',
})
const SvgPartTime16 = forwardRef(function SvgPartTime16(
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
        d='M15 7.5c0 .168-.005.335-.016.5H13.98A6.5 6.5 0 1 0 8 13.981v1.003A7.5 7.5 0 1 1 15 7.5ZM8 7v1H4V7h3V2h1v5Zm1.77 6v-.515H8.29l.34-.264c.696-.559 1.12-1.043 1.12-1.576 0-.665-.565-1.03-1.21-1.03-.465 0-.935.18-1.23.535l.34.385c.21-.24.51-.4.9-.4.305 0 .605.16.605.51 0 .48-.505.915-1.8 1.895V13H9.77Zm1.85.06c.935 0 1.335-.885 1.335-1.725 0-.84-.4-1.72-1.335-1.72-.935 0-1.335.88-1.335 1.72s.4 1.725 1.335 1.725Zm-.74-1.725c0 .635.195 1.205.74 1.205.545 0 .74-.57.74-1.205 0-.635-.195-1.2-.74-1.2-.545 0-.74.565-.74 1.2ZM15.66 13h-.525v-1.52c0-.375-.195-.49-.49-.49a.811.811 0 0 0-.62.325V13H13.5V9.665h.525v1.25c.16-.19.475-.39.855-.39.52 0 .78.27.78.765V13Z'
        fill='currentColor'
      />
    </svg>
  )
})

SvgPartTime16.displayName = 'SvgPartTime16'
export default SvgPartTime16

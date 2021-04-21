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
const useStyles = makeStyles(styles, { name: 'PicassoSvgPieChart24' })
const SvgPieChart24 = forwardRef(function SvgPieChart24 (
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
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M12 2v10h10v.5C22 18.299 17.299 23 11.5 23S1 18.299 1 12.5C1 6.796 5.548 2.154 11.216 2.004L11.5 2h.5zm-1 1.013l-.306.02C5.824 3.444 2 7.526 2 12.5a9.5 9.5 0 009.5 9.5c4.975 0 9.057-3.825 9.466-8.694l.019-.267.001-.039H11V3.013zM13.5 1a9.5 9.5 0 019.496 9.23l.004.27v.5H13V1h.5zm.5 1.014V10h7.985A8.505 8.505 0 0014 2.014z' />
    </svg>
  )
})

SvgPieChart24.displayName = 'SvgPieChart24'
export default SvgPieChart24

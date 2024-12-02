import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgExpand16',
})
const SvgExpand16 = forwardRef(function SvgExpand16(
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
        d='M1.013 3.507V6H2V2.707L4.073 4.78l2.074 2.073L6.5 6.5l.353-.353L4.78 4.073 2.707 2H6v-.987H1.013v2.494m8.987-2V2h3.293L11.22 4.073 9.147 6.147 9.5 6.5l.353.353 2.074-2.073L14 2.707V6h.987V1.013H10v.494M4.073 11.22 2 13.293V10h-.987v4.987H6V14H2.707l2.073-2.074 2.074-2.073L6.5 9.5l-.354-.353-2.073 2.073M9.5 9.5l-.353.353 2.073 2.074L13.293 14H10v.987h4.987V10H14v3.293l-2.073-2.073-2.074-2.073L9.5 9.5'
      />
    </svg>
  )
})

SvgExpand16.displayName = 'SvgExpand16'
export default SvgExpand16

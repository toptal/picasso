import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

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
        d='M8.185 0l6.763 6.838.076.073.077.076L21 12.95l-9.595 9.65 4.396 4.445L12.859 30l-6.72-6.794-.117-.115-.123-.122L0 17.007 9.562 7.39 5.205 2.989 8.185 0zm4.034 10.715a.54.54 0 00-.246.152l-.07.069-5.462 5.498c-.159.154-.197.226-.225.314a.437.437 0 000 .265c.019.073.052.14.151.249l.068.07 1.733 1.754c.153.16.224.199.312.227a.427.427 0 00.262 0c.069-.019.133-.053.245-.153l.072-.068 5.462-5.498c.159-.155.197-.226.224-.315a.437.437 0 000-.264.547.547 0 00-.15-.249l-.068-.071-1.733-1.754c-.154-.16-.225-.198-.312-.226a.427.427 0 00-.263 0zM19.414.017c.383 0 .711.137.985.413.273.276.41.607.41.993 0 .391-.137.717-.41.987a1.331 1.331 0 01-.985.408 1.31 1.31 0 01-.978-.408 1.325 1.325 0 01-.405-.987c0-.386.131-.717.405-.993.273-.276.601-.413.978-.413zm.006.226c-.323 0-.596.115-.82.347a1.137 1.137 0 00-.34.833c0 .325.11.606.334.833.225.226.498.341.826.341.323 0 .596-.115.82-.341.224-.232.339-.508.339-.833 0-.326-.115-.607-.339-.833a1.098 1.098 0 00-.82-.347zm.093.413c.306 0 .486.182.486.436 0 .215-.158.375-.371.419l.377.678h-.257l-.372-.667h-.251v.667h-.23V.656h.618zm-.033.199l-.355.005v.464h.355c.197 0 .295-.078.295-.232 0-.16-.098-.237-.295-.237z'
        fillRule='evenodd'
      />
    </svg>
  )
})
SvgLogoEmblem.displayName = 'SvgLogoEmblem'
export default withStyles(styles)(SvgLogoEmblem)

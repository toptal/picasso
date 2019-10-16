import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, ColorType } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: ColorType | string
  base?: number
}
const SvgKrOwnershipPending24 = forwardRef(function SvgKrOwnershipPending24(
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
  let svgColor
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (!availableClasses[`${colorClassName}`]) {
    svgColor = color
  } else {
    classes.push(availableClasses[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={cx(...classes)}
      style={svgStyle}
      color={svgColor}
      ref={ref}
    >
      <path
        d='M13.81 1L14 .184a10.98 10.98 0 0 0-4 0l.19.816a9.005 9.005 0 0 1 3.62 0zm-3.62 22l-.19.833c.667.084 1.333.167 2 .167s1.333-.083 2-.167L13.81 23a8.825 8.825 0 0 1-3.62 0zm13.643-13l-.833.19c.083.572.167 1.239.167 1.81s-.084 1.238-.167 1.81l.833.19c.084-.667.167-1.333.167-2s-.083-1.333-.167-2zM.167 10C.083 10.667 0 11.333 0 12s.083 1.333.167 2L1 13.81C.917 13.238.833 12.57.833 12s.084-1.238.167-1.81L.167 10zm18.519-8L18 2.914l1.714 1.372c.572.571 1.029 1.143 1.372 1.714L22 5.314c-.457-.571-.914-1.257-1.486-1.828-.571-.572-1.257-1.029-1.828-1.486zM2.914 18L2 18.514c.457.429.914.943 1.486 1.372.571.428 1.143.857 1.828 1.114L6 20.314l-1.714-1.028c-.457-.429-1.029-.857-1.372-1.286zm16.8 1.286A9.08 9.08 0 0 1 18 20.314l.686.686a11.542 11.542 0 0 0 1.828-1.114c.572-.429 1.143-.857 1.486-1.372L21.086 18c-.343.429-.915.857-1.372 1.286zm-15.428-15C4.857 3.714 5.429 3.257 6 2.914L5.314 2c-.571.457-1.257.914-1.828 1.486C2.914 4.057 2.343 4.629 2 5.314L2.914 6c.343-.571.915-1.143 1.372-1.714zm10.607 7.907c-.28-.104-.562-.312-.842-.415-.281-.104-.468-.104-.75-.208.282-.103.562-.31.843-.622.843-.726 1.31-1.867 1.31-3.007 0-1.141-.467-2.282-1.31-3.008-.561-.622-1.31-.933-2.153-.933h-.187c-.749 0-1.498.311-2.06.726-.936.726-1.497 1.97-1.497 3.215 0 1.244.561 2.489 1.497 3.215.281.207.469.31.75.518-.281.104-.469.104-.656.207l-.562.312C7.216 13.23 6 15.407 6 18h.936c0-2.178 1.03-3.94 2.808-4.874.188-.104.375-.207.469-.311.561-.208 1.123-.311 1.685-.415.561 0 1.123.104 1.685.311.28.104.468.208.748.311 1.592.934 2.715 2.8 2.715 4.874h.936c.187-2.385-1.123-4.666-3.089-5.703zm-2.808-1.349c-.656 0-1.124-.207-1.592-.518C9.838 9.807 9.37 8.874 9.37 7.94c0-.934.374-1.763 1.123-2.385.468-.312.936-.519 1.405-.519h.093c.562 0 1.123.207 1.592.726.561.518.936 1.348.936 2.178 0 .933-.375 1.659-.936 2.281-.375.415-.937.622-1.498.622z'
        fillRule='nonzero'
      />
    </svg>
  )
})

SvgKrOwnershipPending24.displayName = 'SvgKrOwnershipPending24'
export default withStyles(styles)(SvgKrOwnershipPending24)

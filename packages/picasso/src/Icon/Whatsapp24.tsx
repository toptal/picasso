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
  name: 'PicassoSvgWhatsapp24',
})
const SvgWhatsapp24 = forwardRef(function SvgWhatsapp24(
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
        clipRule='evenodd'
        d='M20.405 3.487A11.804 11.804 0 0 0 11.995 0C5.438 0 .102 5.336.102 11.893c0 2.094.546 4.14 1.586 5.946L0 24l6.305-1.655a11.856 11.856 0 0 0 5.684 1.446h.006C18.546 23.791 24 18.455 24 11.898c0-3.177-1.35-6.16-3.595-8.41Zm-8.41 18.3a9.867 9.867 0 0 1-5.036-1.376l-.359-.215-3.74.98.997-3.647-.236-.375a9.852 9.852 0 0 1-1.51-5.261c0-5.448 4.435-9.884 9.889-9.884a9.797 9.797 0 0 1 6.986 2.898c1.864 1.87 3.01 4.35 3.005 6.991 0 5.454-4.548 9.89-9.996 9.89Zm3.39-8.367c.274.096 1.736.814 2.031.964l.137.066c.22.105.367.176.426.288.075.123.075.717-.172 1.414-.246.696-1.43 1.328-2.003 1.414-.943.14-1.683.07-3.568-.745-2.779-1.202-4.656-3.886-5.023-4.41a3.736 3.736 0 0 0-.056-.079l-.013-.018c-.186-.253-1.198-1.632-1.198-3.057 0-1.366.669-2.083.98-2.415l.06-.065a1.1 1.1 0 0 1 .793-.37 9.57 9.57 0 0 1 .636.012c.173 0 .39 0 .601.508l.287.698c.265.646.576 1.403.63 1.509.074.15.122.321.026.52-.253.505-.514.778-.699.971-.23.242-.344.36-.174.652 1.152 1.977 2.298 2.662 4.044 3.536.295.15.472.123.643-.075.177-.204.745-.868.943-1.168.198-.3.397-.252.67-.15Z'
        fill='currentColor'
      />
    </svg>
  )
})

SvgWhatsapp24.displayName = 'SvgWhatsapp24'
export default SvgWhatsapp24

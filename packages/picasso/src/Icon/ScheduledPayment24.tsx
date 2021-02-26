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
const useStyles = makeStyles(styles, { name: 'PicassoSvgScheduledPayment24' })
const SvgScheduledPayment24 = forwardRef(function SvgScheduledPayment24(
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
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M20 11v1.72c1.159.093 2.098.52 2.818 1.282l-.7.854c-.558-.612-1.264-.973-2.116-1.083l-.003 3.037.264.083c.48.154.924.317 1.33.49s.747.45 1.022.833c.275.383.413.845.413 1.386 0 .765-.282 1.414-.847 1.946-.495.466-1.222.728-2.18.786L20 24h-1v-1.68c-1.239-.114-2.239-.6-3-1.458l.686-.882c.647.723 1.418 1.152 2.314 1.285v-3.437c-.179-.053-.358-.108-.536-.165a6.058 6.058 0 01-1.071-.455 2.151 2.151 0 01-.791-.756c-.205-.327-.308-.714-.308-1.162 0-.765.303-1.388.91-1.869.494-.391 1.092-.623 1.796-.696V11h1zm.002 7.104v3.191c.567-.046.997-.202 1.29-.468.355-.322.532-.698.532-1.127 0-.327-.103-.602-.308-.826a2.08 2.08 0 00-.791-.525 8.783 8.783 0 00-.723-.245zM6 1v2h12V1h1v2h5v8h-1V9H1v11h13v1H0V3h5V1h1zm13 12.764a2.014 2.014 0 00-.963.385c-.36.275-.539.632-.539 1.071 0 .327.138.597.413.812.275.215.616.373 1.022.476l.067.017v-2.761zM5 4H1v4h22V4h-4v2h-1V4H6v2H5V4z' />
    </svg>
  )
})

SvgScheduledPayment24.displayName = 'SvgScheduledPayment24'
export default SvgScheduledPayment24

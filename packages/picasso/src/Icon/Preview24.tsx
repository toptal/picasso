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
  name: 'PicassoSvgPreview24',
})
const SvgPreview24 = forwardRef(function SvgPreview24(
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
      fill='none'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M.079 0h3.987v1h-2.99v3H.078V0ZM19.016 0h3.987v4h-.997V1h-2.99V0ZM.079 19h.996v3h2.99v1H.08v-4ZM22.006 22v-3h.997v4h-3.987v-1h2.99ZM1.17 11.5c.103.153.256.37.46.627.426.541 1.072 1.264 1.943 1.988C5.314 15.56 7.946 17 11.541 17c3.595 0 6.227-1.44 7.968-2.885a13.39 13.39 0 0 0 1.943-1.988c.204-.258.357-.474.46-.627-.103-.153-.256-.37-.46-.627a13.393 13.393 0 0 0-1.944-1.988C17.769 7.44 15.137 6 11.542 6 7.946 6 5.314 7.44 3.573 8.885a13.39 13.39 0 0 0-1.943 1.988c-.204.258-.357.474-.46.627Zm21.335 0 .43-.252v-.001l-.001-.002-.003-.004-.01-.017-.034-.056a11.488 11.488 0 0 0-.653-.915 14.396 14.396 0 0 0-2.09-2.138C18.27 6.56 15.422 5 11.54 5 7.66 5 4.81 6.56 2.938 8.115a14.396 14.396 0 0 0-2.09 2.137 11.485 11.485 0 0 0-.653.916 4.307 4.307 0 0 0-.034.056l-.01.017-.003.004v.002H.146l.43.253-.43-.252L0 11.5l.146.252.431-.252-.43.252v.001l.001.002.003.004.01.017.034.056a11.485 11.485 0 0 0 .653.915 14.4 14.4 0 0 0 2.09 2.138C4.81 16.44 7.66 18 11.54 18c3.88 0 6.73-1.56 8.603-3.115a14.4 14.4 0 0 0 2.09-2.137 11.488 11.488 0 0 0 .652-.916l.035-.056.01-.017.003-.004v-.002h.001l-.43-.253Zm0 0 .43.252.147-.252-.147-.252-.43.252Z' />
    </svg>
  )
})

SvgPreview24.displayName = 'SvgPreview24'
export default SvgPreview24

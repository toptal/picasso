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
      fill='none'
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M.079 0h3.987v1h-2.99v3H.078V0Zm18.937 0h3.987v4h-.997V1h-2.99V0ZM1.076 19H.078v4h3.987v-1h-2.99v-3Zm20.93 3v-3h.997v4h-3.987v-1h2.99ZM1.17 11.5c.104.153.257.37.46.627.427.541 1.073 1.264 1.944 1.988C5.314 15.56 7.946 17 11.541 17c3.595 0 6.227-1.44 7.968-2.885a13.39 13.39 0 0 0 1.943-1.988c.204-.258.357-.474.46-.627-.103-.153-.256-.37-.46-.627a13.393 13.393 0 0 0-1.944-1.988C17.769 7.44 15.137 6 11.542 6 7.946 6 5.314 7.44 3.573 8.885a13.39 13.39 0 0 0-1.943 1.988c-.204.258-.357.474-.46.627Zm21.336 0 .43-.252v-.001l-.001-.002-.003-.004-.01-.017-.035-.056a11.488 11.488 0 0 0-.653-.915 14.396 14.396 0 0 0-2.09-2.138C18.272 6.56 15.423 5 11.542 5 7.66 5 4.81 6.56 2.938 8.115a14.396 14.396 0 0 0-2.09 2.137 11.485 11.485 0 0 0-.653.916 4.307 4.307 0 0 0-.034.056l-.01.017-.003.004v.002H.146l.43.253-.43-.252L0 11.5l.146.252.431-.252-.43.252v.001l.001.002.003.004.01.017.034.056a11.485 11.485 0 0 0 .653.915 14.4 14.4 0 0 0 2.09 2.138C4.81 16.44 7.66 18 11.54 18c3.88 0 6.73-1.56 8.603-3.115a14.4 14.4 0 0 0 2.09-2.137 11.488 11.488 0 0 0 .652-.916l.035-.056.01-.016.003-.005v-.002h.001l-.43-.253Zm0 0 .43.252.147-.252-.147-.252-.43.252ZM11.54 8c-1.927 0-3.489 1.567-3.489 3.5S9.614 15 11.541 15c1.927 0 3.489-1.567 3.489-3.5S13.468 8 11.54 8Zm-4.485 3.5c0-2.485 2.008-4.5 4.485-4.5a4.493 4.493 0 0 1 4.485 4.5c0 2.485-2.008 4.5-4.485 4.5a4.493 4.493 0 0 1-4.485-4.5Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgPreview24.displayName = 'SvgPreview24'
export default SvgPreview24

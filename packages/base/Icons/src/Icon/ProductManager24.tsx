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
  name: 'PicassoSvgProductManager24',
})
const SvgProductManager24 = forwardRef(function SvgProductManager24(
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
        d='M6.23 3.582 1 6.2v12.6l5.2 2.6c2.86 1.43 5.245 2.6 5.3 2.6.055 0 2.375-1.138 5.156-2.528l5.057-2.528-.217-.432c-.119-.238-.226-.432-.236-.432-.011 0-2.212 1.096-4.89 2.435L11.5 22.95l-4.75-2.375L2 18.2v-5.44c0-2.992.009-5.44.02-5.44.011 0 2.148 1.064 4.75 2.365l4.73 2.365 5.05-2.525C21.211 7.195 21.615 7 21.8 7h.2v-.8l-5.24-2.62C13.878 2.139 11.507.961 11.49.962a768.43 768.43 0 0 0-5.26 2.62M20.36 6.5c0 .011-1.993 1.017-4.43 2.235L11.5 10.95 7.07 8.735C4.634 7.517 2.64 6.511 2.64 6.5c0-.011 1.993-1.017 4.43-2.235L11.5 2.05l4.43 2.215c2.436 1.218 4.43 2.224 4.43 2.235m-.04 6.48-1.819 1.82-.821-.82-.821-.82-.349.35-.349.351 1.169 1.169 1.17 1.17 2.171-2.171 2.17-2.17-.351-.349-.351-.349-1.819 1.819'
      />
    </svg>
  )
})

SvgProductManager24.displayName = 'SvgProductManager24'
export default SvgProductManager24

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
  name: 'PicassoSvgProjectDiscovery24',
})
const SvgProjectDiscovery24 = forwardRef(function SvgProjectDiscovery24(
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
        d='M12.603.044A10.585 10.585 0 0 0 7.2 2.113c-.606.449-1.638 1.481-2.087 2.087-1.507 2.034-2.255 4.524-2.082 6.933.17 2.384 1.02 4.465 2.556 6.26l.148.172-2.537 2.537L.66 22.64l.35.35.35.35 2.538-2.538 2.537-2.537.172.148c.378.323 1.075.829 1.473 1.069 3.668 2.208 8.263 1.975 11.72-.595.604-.449 1.638-1.483 2.087-2.087 2.806-3.774 2.806-8.826 0-12.6-.449-.604-1.483-1.638-2.087-2.087C17.711.56 15.135-.18 12.603.044m1.82.997a9.598 9.598 0 0 1 5.043 2.064c.482.39 1.066.978 1.466 1.474l.322.401-6.627.01L8 5l-.01 6.627-.01 6.627-.401-.322A9.506 9.506 0 0 1 6.105 4.534 10.163 10.163 0 0 1 8.3 2.542c.864-.575 2.186-1.126 3.22-1.342a10.477 10.477 0 0 1 2.903-.159m7.685 5.429c.407.861.76 2.106.83 2.93.014.165.035.368.047.45l.022.15H15v1h8.001l-.023.23c-.128 1.287-.392 2.281-.881 3.32l-.211.45H12v1l4.627.01 4.627.01-.322.401a9.52 9.52 0 0 1-11.471 2.682L9 18.886V6h12.886l.222.47'
      />
    </svg>
  )
})

SvgProjectDiscovery24.displayName = 'SvgProjectDiscovery24'
export default SvgProjectDiscovery24

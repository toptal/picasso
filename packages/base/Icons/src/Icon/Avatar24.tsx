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
  name: 'PicassoSvgAvatar24',
})
const SvgAvatar24 = forwardRef(function SvgAvatar24(
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
        d='M11.28.023a52.57 52.57 0 0 1-.58.06C8.441.308 6.184 1.262 4.352 2.764 3.878 3.153 2.926 4.13 2.563 4.6 1.204 6.36.411 8.263.095 10.524c-.096.689-.096 2.263 0 2.952.331 2.368 1.203 4.384 2.669 6.172.389.474 1.366 1.426 1.836 1.789 1.801 1.391 3.82 2.215 6.1 2.488.242.029.827.053 1.3.053.473 0 1.058-.024 1.3-.053a12.19 12.19 0 0 0 6.059-2.457c.541-.416 1.693-1.568 2.109-2.109a12.19 12.19 0 0 0 2.457-6.059c.068-.566.068-2.034 0-2.6a12.236 12.236 0 0 0-2.487-6.1c-.366-.472-1.318-1.449-1.79-1.836A12.053 12.053 0 0 0 13.465.098C13 .038 11.572-.01 11.28.023m2.34 1.091c1.267.195 2.249.513 3.428 1.112 2.842 1.443 4.989 4.218 5.689 7.354.195.872.24 1.328.24 2.42 0 1.092-.045 1.548-.24 2.42-.7 3.134-2.822 5.881-5.677 7.347a10.81 10.81 0 0 1-3.56 1.139c-.676.1-2.324.1-3 0-2.443-.36-4.564-1.418-6.276-3.13-1.713-1.713-2.769-3.831-3.13-6.276-.1-.676-.1-2.324 0-3 .361-2.445 1.417-4.563 3.13-6.276 1.742-1.743 4.057-2.876 6.416-3.142l.52-.059c.379-.043 1.964.015 2.46.091M11.49 5.04a4.039 4.039 0 0 0-3.115 2.303c-.253.547-.346.991-.346 1.657 0 .494.016.637.102.965a4.091 4.091 0 0 0 1.526 2.264c.215.158.228.177.146.199-.192.05-.76.349-1.143.602a5.84 5.84 0 0 0-.883.747c-.844.845-1.324 1.699-1.599 2.843-.077.321-.178 1.074-.178 1.33 0 .037.125.05.494.05h.494l.023-.35a4.934 4.934 0 0 1 1.457-3.18 4.98 4.98 0 0 1 2.534-1.377c.472-.102 1.524-.102 1.996 0 .98.211 1.842.68 2.537 1.379.868.875 1.375 1.982 1.454 3.178l.023.35h.494c.369 0 .494-.013.494-.05 0-.256-.101-1.009-.178-1.33-.272-1.132-.766-2.01-1.599-2.843a5.89 5.89 0 0 0-.883-.747c-.383-.253-.951-.552-1.143-.602-.082-.022-.069-.041.146-.199a4.091 4.091 0 0 0 1.526-2.264c.086-.328.102-.471.102-.965 0-.666-.093-1.11-.346-1.657-.297-.644-.829-1.273-1.391-1.647-.787-.523-1.862-.78-2.744-.656m1.142 1.021c.385.077.948.349 1.264.611 1.081.898 1.412 2.391.805 3.628-.739 1.504-2.518 2.128-4.001 1.402a3.002 3.002 0 0 1-1.008-4.625c.401-.484 1.079-.901 1.65-1.014a3.75 3.75 0 0 1 1.29-.002'
      />
    </svg>
  )
})

SvgAvatar24.displayName = 'SvgAvatar24'
export default SvgAvatar24

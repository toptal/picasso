import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps, JssProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgReferralBonus24' })
const SvgReferralBonus24 = forwardRef(function SvgReferralBonus24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, color, scale, base } = props
  const classes: Record<string, string> = useStyles()
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
    >
      <path d='M13 21.5h-2V24h-1v-2.5c-2.727-.025-5.217-1.515-6.443-3.869l-.231-.443.886-.462.231.443c1.053 2.02 3.199 3.306 5.557 3.33V12.5H8.687a5.288 5.288 0 01-3.66-1.457A4.91 4.91 0 013.5 7.5c0-2.766 2.327-5 5.188-5H10V0h1v2.5h2V0h1v2.5c2.727.025 5.217 1.515 6.443 3.869l.231.443-.886.462-.231-.443c-1.053-2.02-3.199-3.306-5.557-3.33V11.5h1.313c2.86 0 5.187 2.234 5.187 5s-2.327 5-5.188 5H14V24h-1v-2.5zm0-10v-8h-2v8h2zm0 9v-8h-2v8h2zm1 0h1.313c2.317 0 4.187-1.796 4.187-4 0-2.204-1.87-4-4.188-4H14v8zm-4-17H8.687C6.37 3.5 4.5 5.296 4.5 7.5a3.91 3.91 0 001.22 2.821A4.289 4.289 0 008.687 11.5H10v-8z' />
    </svg>
  )
})

SvgReferralBonus24.displayName = 'SvgReferralBonus24'
export default SvgReferralBonus24

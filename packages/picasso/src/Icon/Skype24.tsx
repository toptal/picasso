import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps, mergeClasses } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgSkype24' })
const SvgSkype24 = forwardRef(function SvgSkype24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: externalClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes: Record<string, string> = mergeClasses(
    useStyles(props),
    externalClasses
  )
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
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M22.11 14.469a5.512 5.512 0 01-.737 6.913 5.57 5.57 0 01-6.982.704 10.447 10.447 0 01-9.739-2.8 10.34 10.34 0 01-2.736-9.715 5.512 5.512 0 01.711-6.953 5.57 5.57 0 016.98-.705c3.503-.82 7.194.217 9.75 2.76a10.34 10.34 0 012.754 9.796zm-.97-.238a9.34 9.34 0 00-2.49-8.848 9.447 9.447 0 00-8.814-2.497l-.419.098-.359-.236a4.57 4.57 0 00-5.725.58 4.512 4.512 0 00-.584 5.69l.24.363-.101.423A9.34 9.34 0 005.36 18.58a9.447 9.447 0 008.807 2.532l.416-.096.357.235a4.57 4.57 0 005.727-.578 4.512 4.512 0 00.605-5.659l-.236-.363.103-.42zm-13.587.993l-.224-.447.894-.448.224.447A3.12 3.12 0 0011.24 16.5h2.26a2 2 0 000-4h-3a3 3 0 110-6h2.26a4.12 4.12 0 013.687 2.276l.224.447-.894.448-.224-.447A3.12 3.12 0 0012.76 7.5H10.5a2 2 0 000 4h3a3 3 0 110 6h-2.26a4.12 4.12 0 01-3.687-2.276z' />
    </svg>
  )
})

SvgSkype24.displayName = 'SvgSkype24'
export default SvgSkype24

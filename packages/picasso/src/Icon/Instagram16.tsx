import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps, JssProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgInstagram16' })
const SvgInstagram16 = forwardRef(function SvgInstagram16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M8 0C5.827 0 5.555.01 4.702.048 3.85.088 3.27.222 2.76.42a3.918 3.918 0 00-1.417.923c-.445.444-.72.89-.923 1.417-.198.51-.333 1.09-.372 1.942C.008 5.555 0 5.827 0 8s.01 2.445.048 3.298c.04.851.174 1.432.372 1.942.204.525.478.973.923 1.417.444.444.89.72 1.417.923.51.197 1.09.333 1.942.372.853.04 1.125.048 3.298.048s2.445-.01 3.298-.048c.851-.04 1.432-.175 1.942-.372a3.932 3.932 0 001.417-.923c.444-.444.72-.89.923-1.417.197-.51.333-1.09.372-1.942.04-.853.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.851-.175-1.433-.372-1.942a3.926 3.926 0 00-.923-1.417A3.898 3.898 0 0013.24.42c-.51-.198-1.09-.333-1.942-.372C10.445.008 10.173 0 8 0zm0 1.44c2.135 0 2.39.01 3.233.047.78.037 1.204.166 1.485.277.375.145.64.318.921.597.28.28.453.546.598.921.109.281.24.705.275 1.485.038.844.047 1.097.047 3.233s-.01 2.39-.05 3.233c-.04.78-.17 1.204-.28 1.485-.15.375-.32.64-.6.921-.279.28-.549.453-.92.598-.28.109-.71.24-1.49.275-.849.038-1.099.047-3.239.047-2.14 0-2.39-.01-3.24-.05-.78-.04-1.21-.17-1.49-.28-.38-.15-.64-.32-.92-.6a2.43 2.43 0 01-.6-.92c-.11-.28-.239-.71-.28-1.49-.03-.84-.04-1.099-.04-3.229s.01-2.39.04-3.24c.041-.78.17-1.21.28-1.49.14-.38.32-.64.6-.92.28-.28.54-.46.92-.6.28-.11.7-.24 1.48-.28.85-.03 1.1-.04 3.24-.04l.03.02zm0 2.452a4.108 4.108 0 100 8.215 4.108 4.108 0 000-8.215zm0 6.775a2.666 2.666 0 110-5.334 2.666 2.666 0 110 5.334zm5.23-6.937a.96.96 0 11-1.92-.001.96.96 0 011.92.001z' />
    </svg>
  )
})

SvgInstagram16.displayName = 'SvgInstagram16'
export default SvgInstagram16

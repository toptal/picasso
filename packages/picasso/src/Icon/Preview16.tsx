import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgPreview16',
})
const SvgPreview16 = forwardRef(function SvgPreview16(
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
      viewBox='0 0 16 16'
      fill='none'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0.100098 0H3.1001V1H1.1001V3H0.100098V0Z'
        fill='#455065'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M12.1001 0H15.1001V3H14.1001V1H12.1001V0Z'
        fill='#455065'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0.100098 12H1.1001V14H3.1001V15H0.100098V12Z'
        fill='#455065'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M14.1001 14V12H15.1001V15H12.1001V14H14.1001Z'
        fill='#455065'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M1.17591 7.5C1.2316 7.59045 1.3056 7.7046 1.39867 7.83599C1.64696 8.18652 2.02856 8.65638 2.55721 9.1263C3.61032 10.0624 5.24643 11 7.60003 11C9.95364 11 11.5897 10.0624 12.6429 9.1263C13.1715 8.65638 13.5531 8.18652 13.8014 7.83599C13.8945 7.7046 13.9685 7.59045 14.0242 7.5C13.9685 7.40955 13.8945 7.2954 13.8014 7.16401C13.5531 6.81348 13.1715 6.34362 12.6429 5.8737C11.5897 4.93761 9.95364 4 7.60003 4C5.24643 4 3.61032 4.93761 2.55721 5.8737C2.02856 6.34362 1.64696 6.81348 1.39867 7.16401C1.3056 7.2954 1.2316 7.40955 1.17591 7.5ZM14.6 7.5C15.0472 7.27639 15.0471 7.27616 15.047 7.27591L15.046 7.27391L15.044 7.26997L15.0377 7.25779C15.0325 7.2478 15.0253 7.2341 15.016 7.21694C14.9974 7.18261 14.9705 7.1344 14.9351 7.07428C14.8643 6.9541 14.7591 6.786 14.6174 6.58599C14.3345 6.18652 13.9036 5.65638 13.3072 5.1263C12.1103 4.06239 10.2464 3 7.60003 3C4.95364 3 3.08975 4.06239 1.89285 5.1263C1.29651 5.65638 0.865605 6.18652 0.582645 6.58599C0.440973 6.786 0.335785 6.9541 0.264967 7.07428C0.22954 7.1344 0.202661 7.18261 0.184068 7.21694C0.17477 7.2341 0.167539 7.2478 0.162343 7.25779L0.156069 7.26997L0.154068 7.27391L0.15335 7.27534C0.153225 7.27558 0.152819 7.27639 0.600033 7.5L0.152819 7.27639L0.0410156 7.5L0.152819 7.72361L0.600033 7.5C0.152819 7.72361 0.152694 7.72336 0.152819 7.72361L0.15335 7.72467L0.154068 7.72609L0.156069 7.73003L0.162343 7.74221C0.167539 7.7522 0.17477 7.7659 0.184068 7.78306C0.202661 7.81739 0.22954 7.8656 0.264967 7.92572C0.335785 8.0459 0.440973 8.214 0.582645 8.41401C0.865605 8.81348 1.29651 9.34362 1.89285 9.8737C3.08975 10.9376 4.95364 12 7.60003 12C10.2464 12 12.1103 10.9376 13.3072 9.8737C13.9036 9.34362 14.3345 8.81348 14.6174 8.41401C14.7591 8.214 14.8643 8.0459 14.9351 7.92572C14.9705 7.8656 14.9974 7.81739 15.016 7.78306C15.0253 7.7659 15.0325 7.7522 15.0377 7.74221L15.044 7.73003L15.046 7.72609L15.0467 7.72467C15.0468 7.72442 15.0472 7.72361 14.6 7.5ZM14.6 7.5L15.0472 7.72361L15.159 7.5L15.047 7.27591L14.6 7.5Z'
        fill='#455065'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M7.6001 6C6.77167 6 6.1001 6.67157 6.1001 7.5C6.1001 8.32843 6.77167 9 7.6001 9C8.42852 9 9.1001 8.32843 9.1001 7.5C9.1001 6.67157 8.42852 6 7.6001 6ZM5.1001 7.5C5.1001 6.11929 6.21939 5 7.6001 5C8.98081 5 10.1001 6.11929 10.1001 7.5C10.1001 8.88071 8.98081 10 7.6001 10C6.21939 10 5.1001 8.88071 5.1001 7.5Z'
        fill='#455065'
      />
    </svg>
  )
})

SvgPreview16.displayName = 'SvgPreview16'
export default SvgPreview16

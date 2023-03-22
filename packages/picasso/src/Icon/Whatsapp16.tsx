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
  name: 'PicassoSvgWhatsapp16',
})
const SvgWhatsapp16 = forwardRef(function SvgWhatsapp16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.604 2.325A7.87 7.87 0 0 0 7.996 0a7.937 7.937 0 0 0-6.871 11.893L0 16l4.204-1.104a7.904 7.904 0 0 0 3.789.965h.003c4.368 0 8.004-3.557 8.004-7.929 0-2.118-.9-4.107-2.396-5.607Zm-5.608 12.2a6.578 6.578 0 0 1-3.357-.918l-.239-.143-2.493.654.664-2.432-.157-.25a6.568 6.568 0 0 1-1.007-3.507c0-3.633 2.957-6.59 6.593-6.59 1.76 0 3.414.686 4.657 1.932 1.243 1.247 2.007 2.9 2.004 4.661 0 3.636-3.032 6.593-6.665 6.593Zm2.261-5.579c.182.065 1.157.543 1.354.643l.09.044c.147.07.246.117.285.192.05.082.05.479-.115.943-.164.464-.953.886-1.335.943-.629.093-1.122.046-2.379-.497-1.852-.801-3.104-2.59-3.348-2.94l-.038-.053a3.491 3.491 0 0 0-.008-.011c-.124-.17-.799-1.089-.799-2.039 0-.91.446-1.388.653-1.61l.04-.043a.734.734 0 0 1 .529-.247c.132 0 .264 0 .378.008h.046c.116 0 .26 0 .4.339.05.117.118.285.192.465.177.431.384.936.42 1.006.05.1.082.215.017.347-.168.336-.342.518-.466.648-.154.16-.229.24-.116.434.768 1.318 1.532 1.775 2.697 2.357.196.1.314.082.428-.05.118-.136.497-.579.629-.779.132-.2.264-.167.446-.1Z'
        fill='currentColor'
      />
    </svg>
  )
})

SvgWhatsapp16.displayName = 'SvgWhatsapp16'
export default SvgWhatsapp16

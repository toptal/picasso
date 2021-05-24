import React, { FC } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import getNameInitials from '@toptal/picasso/utils/get-name-initials'
import { StandardProps, SizeType } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps {
  /** User full name to display initials on the avatar */
  name: string
  /** Photo url */
  src?: string
  /** A avatar can have different sizes */
  size?: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTreeNodeAvatar'
})

const renderInitials = ({ src, name, classes }: Partial<Props>) => {
  if (src || !name) {
    return null
  }

  const initials = getNameInitials(name)

  return (
    <g>
      <g mask='url(#shape)' className={classes?.shape}>
        <rect x='0' y='0' width='40' height='40' />
      </g>
      <text x='50%' y='50%' className={classes?.text}>
        {initials}
      </text>
    </g>
  )
}

const sizeValues = {
  xxsmall: '32',
  xsmall: '40',
  small: '80',
  medium: '120',
  large: '160'
}

export const TreeNodeAvatar: FC<Props> = props => {
  const classes = useStyles()
  const { name, src, size = 'xxsmall' } = props
  const sizeValue = sizeValues[size]

  return (
    <svg width={sizeValue} height={sizeValue} viewBox='0 0 40 40'>
      <g>
        {src && (
          <image
            href={src}
            x='0'
            y='0'
            height='40'
            width='40'
            mask='url(#shape)'
          />
        )}
        {renderInitials({ classes, name, src })}
      </g>
      <mask id='shape'>
        <g fill='white'>
          <polygon points='0,0 40,0 40,40 8,40 0,32' />
        </g>
      </mask>
    </svg>
  )
}

TreeNodeAvatar.defaultProps = {
  size: 'xxsmall'
}

TreeNodeAvatar.displayName = 'TreeNodeAvatar'

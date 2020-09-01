import React, { FC } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import getNameInitials from '@toptal/picasso/utils/get-name-initials'
import { JssProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props {
  /** User full name to display initials on the avatar */
  name: string
  /** Photo url */
  src?: string
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoTreeNodeAvatar'
})

const renderInitials = ({ src, name, classes }: Partial<Props> & JssProps) => {
  if (src || !name) {
    return null
  }

  const initials = getNameInitials(name)

  return (
    <g>
      <g mask='url(#shape)' className={classes.shape}>
        <rect x='0' y='0' width='40' height='40' />
      </g>
      <text x='50%' y='50%' className={classes.text}>
        {initials}
      </text>
    </g>
  )
}

export const TreeNodeAvatar: FC<Props> = props => {
  const classes = useStyles(props)
  const { name, src } = props

  return (
    <svg width='40' height='40'>
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

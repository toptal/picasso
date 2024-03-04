import React, { useState } from 'react'
import type { Theme } from '@material-ui/core'
import { capitalize, makeStyles } from '@material-ui/core'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'
import { Pencil16, Pencil24 } from '@toptal/picasso-icons'

import styles from './styles'
import { AVATAR_DROPZONE_SVG_SHAPES } from '../../AvatarDropzoneSvg'

export interface Props extends BaseProps {
  size?: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
  disabled?: boolean
  onClick?: (event: React.MouseEvent) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoDropzoneSvg',
})

export const AvatarEditContainer = (props: Props) => {
  const { size = 'small', onClick, 'data-testid': dataTestId } = props
  const [focused, setFocused] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const shapes = AVATAR_DROPZONE_SVG_SHAPES[size!]

  const classes = useStyles()

  const PencilIconComponent =
    size === 'xxsmall' || size === 'xsmall' ? Pencil16 : Pencil24

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  return (
    <button
      className={cx(classes.root, classes[`root${capitalize(size)}`])}
      data-testid={dataTestId}
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <svg
        className={cx(classes.svg, classes[`svg${capitalize(size)}`])}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className={classes.background}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.background}
        />
        <path
          className={cx(classes.outline, {
            [classes.focused]: focused,
          })}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.outline}
          strokeOpacity='.48'
          strokeWidth='3'
          strokeLinejoin='round'
        />
      </svg>
      <PencilIconComponent className={classes.pencilIcon} />
    </button>
  )
}

AvatarEditContainer.displayName = 'AvatarEditContainer'

AvatarEditContainer.defaultProps = {
  size: 'small',
}

export default AvatarEditContainer

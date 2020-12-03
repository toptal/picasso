import React, { ReactNode, FunctionComponent, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIInputAdornment from '@material-ui/core/InputAdornment'
import cx from 'classnames'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

type PositionType = 'start' | 'end'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  position: PositionType
  disabled?: boolean
  disablePointerEvents?: boolean
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoInputAdornment'
})

const InputAdornment: FunctionComponent<Props> = props => {
  const {
    classes: externalClasses,
    className,
    style,
    children,
    position,
    disabled,
    disablePointerEvents,
    ...rest
  } = props

  const classes = mergeClasses(useStyles(props), externalClasses)

  return (
    <MUIInputAdornment
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      classes={{
        root: cx(classes.root, {
          [classes.rootDisabled]: disabled
        })
      }}
      className={className}
      style={style}
      position={position}
      disablePointerEvents={disablePointerEvents}
    >
      {children}
    </MUIInputAdornment>
  )
}

export default InputAdornment

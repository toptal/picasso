import React, {
  ReactNode,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  useCallback
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIInputAdornment from '@material-ui/core/InputAdornment'
import cx from 'classnames'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import capitalize from '@material-ui/core/utils/capitalize'

import styles from './styles'
import noop from '../utils/noop'

type PositionType = 'start' | 'end'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  position: PositionType
  disabled?: boolean
  disablePointerEvents?: boolean
  stopPropagation?: boolean
  size?: SizeType<'small' | 'medium' | 'large'>
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoInputAdornment'
})

const InputAdornment: FunctionComponent<Props> = props => {
  const {
    className,
    style,
    children,
    position,
    disabled,
    disablePointerEvents,
    stopPropagation,
    size = 'medium',
    onClick = noop,
    ...rest
  } = props

  const classes = useStyles()
  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (stopPropagation) {
        event.stopPropagation()
      }

      onClick(event)
    },
    [onClick, stopPropagation]
  )

  return (
    <MUIInputAdornment
      {...rest}
      classes={{
        root: cx(
          classes.root,
          { [classes.rootDisabled]: disabled },
          classes[`root${capitalize(size)}`]
        )
      }}
      className={className}
      style={style}
      position={position}
      disablePointerEvents={disablePointerEvents}
      onClick={handleClick}
    >
      {children}
    </MUIInputAdornment>
  )
}

export default InputAdornment

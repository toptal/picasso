import type { ReactNode, HTMLAttributes, MouseEvent } from 'react'
import React, { useCallback } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { InputAdornment as MUIInputAdornment } from '@material-ui/core'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import { noop } from '@toptal/picasso-utils'

import styles from './styles'

type PositionType = 'start' | 'end'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  position: PositionType
  disabled?: boolean
  disablePointerEvents?: boolean
  stopPropagation?: boolean
  'data-testid'?: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoInputAdornment',
})

const InputAdornment = (props: Props) => {
  const {
    className,
    style,
    children,
    position,
    disabled,
    disablePointerEvents,
    stopPropagation,
    'data-testid': dataTestId,
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

  //
  return (
    <MUIInputAdornment
      {...rest}
      classes={{
        root: cx(classes.root, {
          [classes.rootDisabled]: disabled,
        }),
      }}
      className={className}
      style={style}
      position={position}
      disablePointerEvents={disablePointerEvents}
      onClick={handleClick}
      data-testid={dataTestId}
    >
      {children}
    </MUIInputAdornment>
  )
}

export default InputAdornment

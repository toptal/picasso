import React, { ReactElement } from 'react'
import cx from 'classnames'
import { BaseProps, Button } from '@toptal/picasso'
import { makeStyles, Theme } from '@material-ui/core'

import styles from './styles'
import { ButtonHandlerType } from './types'

type Props = BaseProps & {
  icon: ReactElement
  onClick: ButtonHandlerType
  active?: boolean
  disabled?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorButton',
  index: 10
})

const TextEditorButton = (props: Props) => {
  const { icon, onClick, active, className, style, disabled, ...rest } = props
  const classes = useStyles()

  return (
    <Button.Circular
      variant='flat'
      onClick={onClick}
      icon={icon}
      style={style}
      className={cx(
        classes.button,
        {
          [classes.activeButton]: active
        },
        className
      )}
      disabled={disabled}
      {...rest}
    />
  )
}

TextEditorButton.displayName = 'TextEditorButton'

export default TextEditorButton

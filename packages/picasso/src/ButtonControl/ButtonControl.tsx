import React, { ReactNode } from 'react'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core'
import cx from 'classnames'

import Container from '../Container'
import Button from '../Button'
import styles from './styles'

interface RenderControlArgs {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  id?: string
  checked?: boolean
  disabled?: boolean
  value?: string
}

export interface Props extends BaseProps {
  /** Show checkbox initially as checked */
  checked?: boolean
  /** Show button in the active state (left mouse button down) */
  active?: boolean
  /** Disables button */
  disabled?: boolean
  /** Set focused style for the button */
  focused?: boolean
  /** Set hovered style for the button */
  hovered?: boolean
  /** A button can have different sizes */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** HTML Value of Button component */
  value?: string
  /** Callback invoked when value is changed */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  /** Button text */
  children: ReactNode
  /** The id of the input element */
  id?: string
  /** Control render function */
  renderControl: (args: RenderControlArgs) => ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonControl',
  index: -1
})

const ButtonControl = ({
  children,
  size = 'medium',
  className,
  checked,
  onChange,
  id,
  renderControl,
  value,
  disabled,
  ...props
}: Props) => {
  const classes = useStyles()

  const contentLeftSpacing = size === 'large' ? 1 : 0.5

  return (
    <Button
      {...props}
      className={cx(className, classes.root, classes[size])}
      variant='secondary'
      size={size}
      as='label'
      htmlFor={id}
      disabled={disabled}
    >
      {renderControl({ id, checked, value, onChange, disabled })}
      <Container className={classes.content} left={contentLeftSpacing}>
        {children}
      </Container>
    </Button>
  )
}

ButtonControl.defaultProps = {
  size: 'medium'
}

export default ButtonControl

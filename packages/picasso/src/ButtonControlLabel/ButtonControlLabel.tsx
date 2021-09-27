import React, { ReactElement, ReactNode } from 'react'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core'
import cx from 'classnames'

import Container from '../Container'
import Button from '../Button'
import styles from './styles'

export interface Props extends BaseProps {
  /** Show the control initially as checked */
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
  /** A control element. For instance, it can be be a Radio or a Checkbox */
  control: ReactElement
}

// Using { index: -1 } to inject CSS link to the bottom of the head
// in order to prevent Button's styles to override ButtonAction's ones
// Related Jira issue: https://toptal-core.atlassian.net/browse/FX-1520
const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonControlLabel',
  index: -1
})

const ButtonControlLabel = ({
  children,
  size = 'medium',
  className,
  checked,
  onChange,
  id,
  control,
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
      {React.cloneElement(control, { id, checked, value, onChange, disabled })}
      <Container className={classes.content} left={contentLeftSpacing}>
        {children}
      </Container>
    </Button>
  )
}

ButtonControlLabel.defaultProps = {
  size: 'medium'
}

export default ButtonControlLabel

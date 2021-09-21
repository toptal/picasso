import React, { useMemo, ReactNode } from 'react'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core'
import cx from 'classnames'

import Container from '../Container'
import Button from '../Button'
import styles from './styles'

interface RenderInputArgs {
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
  /** Input render function */
  renderInput: (args: RenderInputArgs) => ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonInput',
  index: -1
})

const ButtonInput = ({
  children,
  size = 'medium',
  className,
  checked,
  onChange,
  id,
  renderInput,
  value,
  disabled,
  ...props
}: Props) => {
  const classes = useStyles()

  const containerLeftOffset = useMemo(() => {
    if (size === 'large') {
      return 1
    }

    return 0.5
  }, [size])

  return (
    <Button
      className={cx(className, classes.root, classes[size])}
      variant='secondary'
      size={size}
      as='label'
      htmlFor={id}
      disabled={disabled}
      {...props}
    >
      {renderInput({ id, checked, value, onChange, disabled })}
      <Container className={classes.content} left={containerLeftOffset}>
        {children}
      </Container>
    </Button>
  )
}

ButtonInput.defaultProps = {
  size: 'medium'
}

export default ButtonInput

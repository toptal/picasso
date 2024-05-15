import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { twMerge } from 'tailwind-merge'
import { Container } from '@toptal/picasso-container'

import { Button } from '../Button'
import { createSizeClassNames, createContentSizeClassNames } from './styles'

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
  const contentLeftSpacing = size === 'large' ? 1 : 0.5

  return (
    <Button
      {...props}
      className={twMerge('text-center', createSizeClassNames(size), className)}
      variant='secondary'
      size={size}
      as='label'
      htmlFor={id}
      disabled={disabled}
    >
      {React.cloneElement(control, { id, checked, value, onChange, disabled })}
      <Container
        className={createContentSizeClassNames(size)}
        left={contentLeftSpacing}
      >
        {children}
      </Container>
    </Button>
  )
}

ButtonControlLabel.defaultProps = {
  size: 'medium',
}

export default ButtonControlLabel

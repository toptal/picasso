import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { FOCUS_RING } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'
import { Container } from '@toptal/picasso-container'

import { createCoreClassNames as createBaseCoreClassNames } from '../ButtonBase/styles'
import {
  createCoreClassNames as createButtonCoreClassNames,
  createVariantClassNames,
  createSizeClassNames as createButtonSizeClassNames,
  createContentClassNames,
} from '../Button/styles'
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
  control: ReactElement<
    Partial<Pick<Props, 'id' | 'checked' | 'value' | 'onChange' | 'disabled'>>
  >
}

// A plain label styled as a Button, so the control inside is the only tab stop
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
  active,
  focused,
  hovered,
  ...rest
}: Props): React.ReactElement => {
  const contentLeftSpacing = size === 'large' ? 1 : 0.5
  const state = { disabled, active, focused, hovered }

  return (
    <label
      {...rest}
      htmlFor={id}
      className={twMerge(
        'base-Button-root',
        createBaseCoreClassNames({ disabled }),
        createButtonCoreClassNames(state),
        createVariantClassNames('secondary', state),
        createButtonSizeClassNames(size),
        'text-center',
        createSizeClassNames(size),
        !disabled && FOCUS_RING.blue.hasFocusVisible,
        className
      )}
      // Keeps the spacing and ButtonGroup styles that target Buttons
      data-component-type='button'
    >
      <Container
        as='span'
        inline
        flex
        direction='row'
        alignItems='center'
        className={twJoin(createContentClassNames(size))}
      >
        {React.cloneElement(control, {
          id,
          checked,
          value,
          onChange,
          disabled,
        })}
        <Container
          className={createContentSizeClassNames(size)}
          left={contentLeftSpacing}
        >
          {children}
        </Container>
      </Container>
    </label>
  )
}

export default ButtonControlLabel

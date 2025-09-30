import type { ChangeEvent } from 'react'
import React, { forwardRef, useState, useCallback } from 'react'
import type { BaseProps, OmitInternalProps } from '@toptal/picasso-shared'
import { OutlinedInput } from '@toptal/picasso-outlined-input'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import { Eye16, EyeHidden16 } from '@toptal/picasso-icons'
import { ButtonCircular } from '@toptal/picasso-button'
import type { Props as OutlinedInputProps } from '@toptal/picasso-outlined-input'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props
  extends Omit<
      OmitInternalProps<OutlinedInputProps>,
      | 'defaultValue'
      | 'type'
      | 'rows'
      | 'rowsMax'
      | 'multiline'
      | 'startAdornment'
      | 'endAdornment'
    >,
    BaseProps {
  /** Value of the `input` element. */
  value?: string
  /** Indicates whether component is in disabled state */
  disabled?: boolean
  /** Callback invoked when `PasswordInput` changes its state. */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  testIds?: OutlinedInputProps['testIds'] & {
    input?: string
    toggle?: string
  }
  highlight?: 'autofill'
}

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
  function PasswordInput(
    { onChange = () => {}, value = '', status = 'default', ...props },
    ref
  ) {
    const {
      disabled,
      size,
      width,
      style,
      className,
      testIds,
      enableReset,
      onResetClick,
      highlight,
      ...rest
    } = props

    const [showPassword, setShowPassword] = useState(false)

    const handleToggleVisibilityClick = useCallback(() => {
      setShowPassword(previousState => !previousState)
    }, [])

    const endAdornment = (
      <InputAdornment position='end'>
        <ButtonCircular
          className='mr-2'
          variant='flat'
          icon={showPassword ? <Eye16 /> : <EyeHidden16 />}
          onClick={handleToggleVisibilityClick}
          data-testid={testIds?.toggle}
          disabled={disabled}
        />
      </InputAdornment>
    )

    return (
      <OutlinedInput
        style={style}
        className={twMerge('pr-0 cursor-text', className)}
        highlight={highlight}
        classes={{
          // removes up/down arrows in browsers based on WebKit and Blink (https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-inner-spin-button)
          input:
            '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 ',
        }}
        inputProps={{
          ...rest,
          'data-testid': testIds?.input,
        }}
        size={size}
        width={width}
        status={status}
        inputRef={ref}
        type={showPassword ? 'text' : 'password'}
        value={value}
        disabled={disabled}
        onChange={onChange}
        endAdornment={endAdornment}
        testIds={testIds}
        onResetClick={onResetClick}
        enableReset={enableReset}
      />
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput

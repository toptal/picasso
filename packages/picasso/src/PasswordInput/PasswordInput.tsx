import React, { forwardRef, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, OmitInternalProps } from '@toptal/picasso-shared'
import ButtonBase from '@material-ui/core/ButtonBase'

import OutlinedInput, { Props as OutlinedInputProps } from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import styles from './styles'
import SvgEye16 from '../Icon/Eye16'
import SvgEyeHidden16 from '../Icon/EyeHidden16'

export interface Props
  extends Omit<
      OmitInternalProps<OutlinedInputProps>,
      'defaultValue' | 'type' | 'rows' | 'rowsMax' | 'multiline'
    >,
    BaseProps {
  /** Value of the `input` element. */
  value?: string | number
  /** Indicates whether component is in error state */
  error?: boolean
  /** Indicates whether component is in disabled state */
  disabled?: boolean
  /** Callback invoked when `NumberInput` changes its state. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPasswordInput'
})

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
  function PasswordInput(props, ref) {
    const {
      value,
      onChange,
      disabled,
      error,
      onResetClick,
      enableReset,
      width,
      ...rest
    } = props

    const [showPassword, setShowPassword] = useState(false)
    const classes = useStyles()

    const handleToggleVisibilityClick = () => {
      setShowPassword(previousState => !previousState)
    }

    const endAdornment = (
      <InputAdornment position='end'>
        <ButtonBase
          disabled={disabled}
          classes={{
            root: classes.toggle,
            disabled: classes.toggleDisabled
          }}
          onClick={handleToggleVisibilityClick}
          data-testid='password-input-toggle'
        >
          {showPassword ? <SvgEyeHidden16 /> : <SvgEye16 />}
        </ButtonBase>
      </InputAdornment>
    )

    return (
      <OutlinedInput
        classes={{
          root: classes.root,
          input: classes.input
        }}
        inputProps={{
          ...rest
        }}
        width={width}
        onResetClick={onResetClick}
        enableReset={enableReset}
        error={error}
        inputRef={ref}
        type={showPassword ? 'text' : 'password'}
        value={value}
        disabled={disabled}
        onChange={onChange}
        endAdornment={endAdornment}
      />
    )
  }
)

PasswordInput.defaultProps = {
  onChange: () => {},
  value: ''
}

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput

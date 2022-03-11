import React, { forwardRef, useState, ChangeEvent, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  BaseProps,
  OmitInternalProps,
  ValidateStatus
} from '@toptal/picasso-shared'
import cx from 'classnames'

import OutlinedInput, { Props as OutlinedInputProps } from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import styles from './styles'
import SvgEye16 from '../Icon/Eye16'
import SvgEyeHidden16 from '../Icon/EyeHidden16'
import Button from '../Button'
import { InputProps } from '../Input'
import { CheckMinor24 } from '../Icon'

export interface Props
  extends Omit<
      OmitInternalProps<OutlinedInputProps>,
      | 'defaultValue'
      | 'type'
      | 'rows'
      | 'rowsMax'
      | 'multiline'
      | 'enableReset'
      | 'onResetClick'
    >,
    BaseProps {
  /** Value of the `input` element. */
  value?: string
  /** @deprecated */
  /** Indicate whether `PasswordInput` is in error state */
  error?: boolean
  /** Indicate whether `PasswordInput` is in error or success state */
  validateStatus?: ValidateStatus
  /** Indicates whether component is in disabled state */
  disabled?: boolean
  /** Callback invoked when `PasswordInput` changes its state. */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  testIds?: InputProps['testIds'] & {
    input?: string
    toggle?: string
    validIcon?: string
  }
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
      validateStatus,
      width,
      style,
      className,
      testIds,
      ...rest
    } = props

    const [showPassword, setShowPassword] = useState(false)
    const classes = useStyles()

    const handleToggleVisibilityClick = useCallback(() => {
      setShowPassword(previousState => !previousState)
    }, [])

    const endAdornment = (
      <InputAdornment position='end'>
        {validateStatus === 'success' && (
          <CheckMinor24 color='green' data-testid={testIds?.validIcon} />
        )}
        <Button.Circular
          className={classes.toggle}
          variant='flat'
          icon={showPassword ? <SvgEye16 /> : <SvgEyeHidden16 />}
          onClick={handleToggleVisibilityClick}
          data-testid={testIds?.toggle}
          disabled={disabled}
        />
      </InputAdornment>
    )

    return (
      <OutlinedInput
        style={style}
        className={cx(classes.root, className)}
        classes={{
          input: classes.input
        }}
        inputProps={{
          ...rest,
          'data-testid': testIds?.input
        }}
        width={width}
        error={Boolean(validateStatus === 'error' || error)}
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

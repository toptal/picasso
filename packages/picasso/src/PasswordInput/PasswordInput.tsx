import React, { forwardRef, useState, ChangeEvent, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, OmitInternalProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import OutlinedInput, { Props as OutlinedInputProps } from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import styles from './styles'
import SvgEye16 from '../Icon/Eye16'
import SvgEyeHidden16 from '../Icon/EyeHidden16'
import Button from '../Button'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'

export interface Props
  extends Omit<
      OmitInternalProps<OutlinedInputProps>,
      'defaultValue' | 'type' | 'rows' | 'rowsMax' | 'multiline'
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
      status,
      width,
      style,
      className,
      testIds,
      enableReset,
      onResetClick,
      ...rest
    } = props

    usePropDeprecationWarning({
      props,
      name: 'error',
      componentName: 'PasswordInput',
      description:
        'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.'
    })

    const [showPassword, setShowPassword] = useState(false)
    const classes = useStyles()

    const handleToggleVisibilityClick = useCallback(() => {
      setShowPassword(previousState => !previousState)
    }, [])

    const endAdornment = (
      <InputAdornment position='end'>
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
        status={error ? 'error' : status}
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

PasswordInput.defaultProps = {
  onChange: () => {},
  value: '',
  status: 'default'
}

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput

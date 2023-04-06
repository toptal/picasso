import type { ChangeEvent } from 'react'
import React, { forwardRef, useState, useCallback } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps, OmitInternalProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import type { Props as OutlinedInputProps } from '../OutlinedInput'
import OutlinedInput from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import styles from './styles'
import SvgEye16 from '../Icon/Eye16'
import SvgEyeHidden16 from '../Icon/EyeHidden16'
import ButtonCircular from '../ButtonCircular'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'

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

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPasswordInput',
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
      highlight,
      ...rest
    } = props

    usePropDeprecationWarning({
      props,
      name: 'error',
      componentName: 'PasswordInput',
      description:
        'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
    })

    const [showPassword, setShowPassword] = useState(false)
    const classes = useStyles()

    const handleToggleVisibilityClick = useCallback(() => {
      setShowPassword(previousState => !previousState)
    }, [])

    const endAdornment = (
      <InputAdornment position='end'>
        <ButtonCircular
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
          root: cx({ [classes.highlightAutofill]: highlight === 'autofill' }),
          input: classes.input,
        }}
        inputProps={{
          ...rest,
          'data-testid': testIds?.input,
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
  status: 'default',
}

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput

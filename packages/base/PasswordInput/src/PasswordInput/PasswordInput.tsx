import type { ChangeEvent } from 'react'
import React, { forwardRef, useState, useCallback } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps, OmitInternalProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { OutlinedInput } from '@toptal/picasso-outlined-input'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import { Eye16, EyeHidden16 } from '@toptal/picasso-icons'
import { ButtonCircular } from '@toptal/picasso-button'
import { usePropDeprecationWarning } from '@toptal/picasso-utils'
import type { Props as OutlinedInputProps } from '@toptal/picasso-outlined-input'

import styles from './styles'

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

    // TODO: [FX-4715]
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
        className={cx(classes.root, className)}
        highlight={highlight}
        classes={{
          input: classes.input,
        }}
        inputProps={{
          ...rest,
          'data-testid': testIds?.input,
        }}
        size={size}
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

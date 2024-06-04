import React, { forwardRef } from 'react'
import cx from 'classnames'
import { OutlinedInput } from '@toptal/picasso-outlined-input'
import { usePropDeprecationWarning } from '@toptal/picasso-utils'
import type { Props as InputProps } from '@toptal/picasso-input'

export const TagSelectorInput = forwardRef<HTMLInputElement, InputProps>(
  function TagSelectorInput(props, ref) {
    const {
      id,
      name,
      defaultValue,
      value,
      placeholder,
      status,
      error,
      disabled,
      autoFocus,
      autoComplete,
      children,
      multiline,
      width,
      style,
      rows,
      rowsMax,
      type,
      onChange,
      startAdornment,
      endAdornment,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onResetClick,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      enableReset,
      inputProps,
      testIds,
      highlight,
      ...rest
    } = props

    // TODO: [FX-4715]
    usePropDeprecationWarning({
      props,
      name: 'error',
      componentName: 'TagSelectorInput',
      description:
        'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
    })

    let usedEndAdornment: React.ReactNode

    if (endAdornment && React.isValidElement(endAdornment)) {
      usedEndAdornment = React.cloneElement(endAdornment, {
        className: 'absolute top-[calc(50%-0.5*1em)] right-[0.625em]',
      })
    }

    return (
      <OutlinedInput
        inputRef={ref}
        style={style}
        className={cx(
          `flex flex-wrap h-auto pb-1 pl-1 pt-1
          [&>input]:min-w-[3em] [&>input]:flex-grow [&>input]:w-0 [&>input]:h-6 [&>input]:pl-1 [&>input]:pr-0 [&>input]:mb-0`,
          {
            'pr-[calc(2*0.625em+1em)]': Boolean(endAdornment),
          }
        )}
        highlight={highlight}
        id={id}
        name={name}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        status={error ? 'error' : status}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        multiline={multiline}
        rows={rows}
        rowsMax={rowsMax}
        type={type}
        width={width}
        // html attributes
        inputProps={{
          ...rest,
          ...inputProps,
        }}
        testIds={testIds}
        endAdornment={usedEndAdornment}
        startAdornment={startAdornment}
        onChange={onChange}
      >
        {children}
      </OutlinedInput>
    )
  }
)

TagSelectorInput.defaultProps = {
  multiline: false,
  width: 'auto',
  status: 'default',
}

TagSelectorInput.displayName = 'TagSelectorInput'

export default TagSelectorInput

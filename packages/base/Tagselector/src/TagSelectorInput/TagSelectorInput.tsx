import React, { forwardRef } from 'react'
import cx from 'classnames'
import { OutlinedInput } from '@toptal/picasso-outlined-input'
import type { InputProps } from '@toptal/picasso-input'

export const TagSelectorInput = forwardRef<HTMLInputElement, InputProps>(
  function TagSelectorInput(props, ref) {
    const {
      id,
      name,
      defaultValue,
      value,
      placeholder,
      status,
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
      size,
      ...rest
    } = props

    let usedEndAdornment: React.ReactNode

    if (endAdornment && React.isValidElement(endAdornment)) {
      usedEndAdornment = React.cloneElement(endAdornment, {
        className: 'absolute top-[calc(50%-0.5em)] right-[0.625em] h-[1em]',
      })
    }

    return (
      <OutlinedInput
        inputRef={ref}
        style={style}
        className={cx(
          `flex flex-wrap h-auto cursor-pointer
          [&>input]:min-w-[3em] [&>input]:flex-grow [&>input]:w-0 [&>input]:h-6 [&>input]:pl-1 [&>input]:pr-0 [&>input]:mb-0`,
          {
            'pr-[2.25em]': Boolean(endAdornment),
            'py-1 pl-1': size === 'medium',
            'gap-[12px] px-4': size === 'large',
          }
        )}
        highlight={highlight}
        id={id}
        name={name}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        status={status}
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
        size={size}
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

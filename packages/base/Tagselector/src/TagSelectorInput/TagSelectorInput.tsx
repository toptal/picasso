import type { ReactElement } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { OutlinedInput } from '@toptal/picasso-outlined-input'
import { usePropDeprecationWarning } from '@toptal/picasso-utils'

import type { Props as InputProps } from '../Input/Input'
import styles from './styles'
import { useFieldsLayoutContext } from '../FieldsLayout'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTagSelectorInput',
})

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

    usePropDeprecationWarning({
      props,
      name: 'error',
      componentName: 'TagSelectorInput',
      description:
        'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
    })

    const classes = useStyles()

    const { layout } = useFieldsLayoutContext()

    let usedEndAdornment = null

    if (endAdornment) {
      usedEndAdornment = React.cloneElement(endAdornment as ReactElement, {
        className: classes.endAdornment,
      })
    }

    return (
      <OutlinedInput
        inputRef={ref}
        style={style}
        className={cx(classes.inputBase, {
          [classes.withEndAdornment]: Boolean(endAdornment),
          [classes.horizontalLayout]: layout === 'horizontal',
        })}
        classes={{
          root: cx({ [classes.highlightAutofill]: highlight === 'autofill' }),
        }}
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

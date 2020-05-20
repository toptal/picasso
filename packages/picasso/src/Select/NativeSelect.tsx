/* eslint-disable max-lines, complexity, max-lines-per-function, max-statements */
import React, { forwardRef, ReactNode } from 'react'
import cx from 'classnames'
import MuiNativeSelect from '@material-ui/core/NativeSelect'
import { Theme, makeStyles } from '@material-ui/core/styles'

import OutlinedInput from '../OutlinedInput'
import { DropdownArrows16 } from '../Icon'
import { getSelection } from './selectValue'
import {
  NativePlaceholder,
  NativeOptionsList,
  removeDuplicatedOptions
} from './options'
import { Props } from './Select'
import { Option } from './types'
import { ItemProps, GetInputProps } from './useSelect'
import styles from './styles'

const useStyles = makeStyles<Theme, Props<any, any>>(styles)

export type NativeSelectProps = Props & {
  selectedOptions: Option[]
  emptySelectValue: string | string[]
  getInputProps: GetInputProps
  getItemProps: (index: number, item: Option) => ItemProps
  startAdornment: ReactNode
  endAdornment: ReactNode
}

const NativeSelect = forwardRef<HTMLDivElement, NativeSelectProps>(
  function NativeSelect(props, ref) {
    const classes = useStyles(props)

    const {
      error,
      disabled,
      name,
      id,
      startAdornment,
      endAdornment,
      width,
      multiple,
      size,
      value,
      onChange,
      options,
      selectedOptions,
      renderOption,
      emptySelectValue,
      placeholder,
      getInputProps,
      getItemProps,
      ...rest
    } = props

    const select = getSelection(
      removeDuplicatedOptions([...options, ...selectedOptions]),
      value
    )

    const nativeStartAdornment = startAdornment && (
      <div className={classes.nativeStartAdornment}>{startAdornment}</div>
    )
    const nativeEndAdornment = endAdornment && (
      <div className={classes.nativeEndAdornment}>{endAdornment}</div>
    )

    const dropDownIcon = (
      <DropdownArrows16
        className={cx(classes.caret, {
          [classes.caretDisabled]: disabled
        })}
      />
    )

    return (
      <MuiNativeSelect
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        error={error}
        disabled={disabled}
        name={name}
        id={id}
        startAdornment={nativeStartAdornment}
        endAdornment={nativeEndAdornment}
        // NativeSelect specific props
        input={
          <OutlinedInput
            width={width}
            inputProps={{ multiple }}
            size={size}
            className={classes.nativeInput}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getInputProps({
              canCloseOnEnter: !multiple
            })}
          />
        }
        value={value}
        onChange={onChange}
        IconComponent={() => dropDownIcon}
        classes={{
          root: cx(classes.select, {
            [classes.placeholder]: !select.isSelected()
          }),
          select: cx({
            [classes.nativeStartAdornmentPadding]: Boolean(
              nativeStartAdornment
            ),
            [classes.nativeEndAdornmentPadding]: Boolean(nativeEndAdornment)
          })
        }}
      >
        <NativePlaceholder
          emptySelectValue={emptySelectValue}
          placeholder={placeholder}
        />
        <NativeOptionsList
          options={options}
          renderOption={renderOption}
          getItemProps={getItemProps}
        />
      </MuiNativeSelect>
    )
  }
)

export default NativeSelect

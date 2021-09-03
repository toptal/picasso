import React, { useRef } from 'react'
import cx from 'classnames'
import MuiNativeSelect from '@material-ui/core/NativeSelect'
import { Theme, makeStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'

import OutlinedInput from '../OutlinedInput'
import SelectCaret from '../SelectCaret'
import {
  ValueType,
  getOptionText,
  useAdornments,
  useSelectState,
  useSelectProps,
  SelectProps,
  renderOption as defaultRenderOption
} from '../Select'
import NativeSelectOptions from '../NativeSelectOptions'
import NativeSelectPlaceholder from '../NativeSelectPlaceholder'
import { documentable, forwardRef, noop, useCombinedRefs } from '../utils'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles)

const DEFAULT_EMPTY_ARRAY_VALUE: ValueType[] = []

export const NativeSelect = documentable(
  forwardRef(
    <T extends ValueType, M extends boolean = false>(
      props: SelectProps<T, M>,
      ref: React.Ref<HTMLInputElement> | null
    ) => {
      const {
        className,
        style,
        width = 'full',
        loading,
        id,
        icon,
        iconPosition = 'start',
        name,
        renderOption = defaultRenderOption,
        placeholder,
        disabled,
        error,
        multiple,
        value = multiple ? DEFAULT_EMPTY_ARRAY_VALUE : '',
        size,
        enableReset,
        onChange,
        options,
        getDisplayValue = getOptionText,
        /* eslint-disable @typescript-eslint/no-unused-vars */
        menuWidth,
        noOptionsText,
        popperContainer,
        enableAutofill,
        autoComplete,
        searchPlaceholder,
        searchThreshold,
        maxSearchItems,
        native,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...rest
      } = props

      const classes = useStyles()

      const selectRef = useCombinedRefs<HTMLInputElement>(
        ref,
        useRef<HTMLInputElement>(null)
      )
      const inputWrapperRef = useRef<HTMLDivElement>(null)

      const selectState = useSelectState({
        getDisplayValue,
        options,
        disabled,
        multiple,
        value
      })
      const { selection, emptySelectValue } = selectState
      const { getItemProps, getInputProps } = useSelectProps({
        selectRef,
        selectProps: props,
        selectState
      })
      const [selectStartAdornment, selectEndAdornment] = useAdornments({
        position: iconPosition,
        icon,
        loading,
        disabled
      })

      const startAdornment = selectStartAdornment && (
        <div className={classes.startAdornment}>{selectStartAdornment}</div>
      )
      const endAdornment = selectEndAdornment && (
        <div className={classes.endAdornment}>{selectEndAdornment}</div>
      )

      const nativeSelectComponent = (
        <MuiNativeSelect
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          ref={selectRef}
          error={error}
          disabled={disabled}
          name={name}
          id={id}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          input={
            <OutlinedInput
              width={width}
              inputProps={{ multiple }}
              size={size}
              className={classes.nativeInput}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getInputProps()}
            />
          }
          value={value}
          onChange={onChange as any}
          IconComponent={() => <SelectCaret disabled={disabled} />}
          classes={{
            root: cx(classes.select, {
              [classes.placeholder]: !selection.isSelected()
            }),
            select: cx({
              [classes.startAdornmentPadding]: React.isValidElement(
                startAdornment
              ),
              [classes.endAdornmentPadding]: React.isValidElement(endAdornment)
            })
          }}
        >
          <NativeSelectPlaceholder
            emptySelectValue={emptySelectValue}
            disabled={!enableReset}
          >
            {placeholder}
          </NativeSelectPlaceholder>
          <NativeSelectOptions
            options={options}
            renderOption={renderOption}
            getItemProps={getItemProps}
          />
        </MuiNativeSelect>
      )

      return (
        <div
          className={cx(
            classes.root,
            className,
            classes[`root${capitalize(width)}`],
            {
              [classes.rootDisabled]: disabled
            }
          )}
          style={style}
          ref={inputWrapperRef}
        >
          {nativeSelectComponent}
        </div>
      )
    }
  )
)

NativeSelect.defaultProps = {
  disabled: false,
  error: false,
  getDisplayValue: getOptionText,
  iconPosition: 'start',
  loading: false,
  noOptionsText: 'No matches found',
  onChange: noop,
  onBlur: noop,
  renderOption: defaultRenderOption,
  size: 'medium',
  width: 'full',
  searchThreshold: 10,
  enableAutofill: false,
  searchPlaceholder: 'Search'
}

NativeSelect.displayName = 'NativeSelect'

export default NativeSelect

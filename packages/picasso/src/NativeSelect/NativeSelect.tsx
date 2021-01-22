/* eslint-disable max-lines, complexity, max-lines-per-function, max-statements */
import React, { useRef } from 'react'
import cx from 'classnames'
import NativeSelect from '@material-ui/core/NativeSelect'
import { Theme, makeStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import PopperJs from 'popper.js'

import OutlinedInput from '../OutlinedInput'
import { disableUnsupportedProps, useCombinedRefs } from '../utils'
import { FeatureOptions } from '../utils/disable-unsupported-props'
import { Option, ValueType, ItemProps } from '../Select/types'
import { getOptionText } from '../Select/hooks/utils'
import useSelect from '../Select/hooks/use-select'
import styles from './styles'
import { documentable, forwardRef } from '../utils/forward-ref'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'
import noop from '../utils/noop'
import SelectCaret from '../SelectCaret'
import { SelectProps } from '../Select'
import useAdornments from '../Select/hooks/use-adornments'

const useStyles = makeStyles<Theme>(styles)

export type Props<
  T extends ValueType = ValueType,
  M extends boolean = boolean,
  V = M extends true ? T[] : T
> = SelectProps<T, M, V>

type NativePlaceholderProps = Pick<Props, 'placeholder'> & {
  emptySelectValue: string | string[]
  disabled: boolean
}

type NativeOptionsProps = Pick<Props, 'options' | 'renderOption'> & {
  getItemProps: (index: number, option: Option) => ItemProps
}

const DEFAULT_EMPTY_ARRAY_VALUE: ValueType[] = []

const renderNativePlaceholder = ({
  emptySelectValue,
  disabled,
  placeholder
}: NativePlaceholderProps) => (
  <option disabled={disabled} value={emptySelectValue}>
    {placeholder}
  </option>
)

const renderNativeOptions = ({
  options,
  renderOption,
  getItemProps
}: NativeOptionsProps) =>
  options.map((option, index) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { close, onItemSelect, ...rest } = getItemProps(index, option)

    return (
      <option
        key={option.key || option.value}
        value={option.value}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {renderOption!(option)}
      </option>
    )
  })

const purifyProps = (props: Props<any, any>): Props<ValueType, boolean> => {
  const sizeOptions: FeatureOptions<Props> = {
    featureProps: {
      size: 'small'
    },
    unsupportedProps: {
      icon: undefined,
      loading: false
    }
  }

  return disableUnsupportedProps('Select', props, sizeOptions)
}

export const Select = documentable(
  forwardRef(
    <T extends ValueType, M extends boolean = false>(
      props: Props<T, M>,
      ref: React.Ref<HTMLInputElement> | null
    ) => {
      usePropDeprecationWarning({
        props,
        name: 'onSearchChange',
        componentName: 'Select',
        description:
          'Use the Autocomplete component if you require dynamic options.'
      })

      const {
        className,
        style,
        width,
        loading,
        id,
        icon,
        iconPosition,
        name,
        renderOption,
        placeholder,
        disabled,
        error,
        multiple,
        value = multiple ? DEFAULT_EMPTY_ARRAY_VALUE : '',
        size,
        enableReset,
        onChange,
        options,
        /* eslint-disable @typescript-eslint/no-unused-vars */
        menuWidth,
        noOptionsText,
        popperContainer,
        enableAutofill,
        autoComplete,
        searchPlaceholder,
        getDisplayValue,
        searchThreshold,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...rest
      } = purifyProps(props)

      const classes = useStyles()

      const selectRef = useCombinedRefs<HTMLInputElement>(
        ref,
        useRef<HTMLInputElement>(null)
      )
      const searchInputRef = useRef<HTMLInputElement>(null)
      const popperRef = useRef<PopperJs>(null)
      const inputWrapperRef = useRef<HTMLDivElement>(null)

      const {
        getItemProps,
        getInputProps,
        selection,
        emptySelectValue
      } = useSelect({
        ...props,
        native: true,
        selectRef,
        popperRef,
        searchInputRef
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
        <NativeSelect
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          ref={selectRef}
          error={error}
          disabled={disabled}
          name={name}
          id={id}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          // NativeSelect specific props
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
          onChange={onChange}
          IconComponent={SelectCaret}
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
          {renderNativePlaceholder({
            emptySelectValue,
            disabled: !enableReset,
            placeholder
          })}
          {renderNativeOptions({
            options,
            renderOption,
            getItemProps
          })}
        </NativeSelect>
      )

      return (
        <div
          className={cx(
            classes.root,
            className,
            classes[`root${capitalize(width!)}`],
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

Select.defaultProps = {
  disabled: false,
  error: false,
  getDisplayValue: getOptionText,
  iconPosition: 'start',
  loading: false,
  noOptionsText: 'No matches found',
  onChange: noop,
  onBlur: noop,
  renderOption: (option: Option) => option.text,
  size: 'medium',
  width: 'full',
  searchThreshold: 10,
  enableAutofill: false,
  searchPlaceholder: 'Search'
}

Select.displayName = 'Select'

export default Select

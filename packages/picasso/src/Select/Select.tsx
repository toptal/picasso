/* eslint-disable max-lines, complexity, max-lines-per-function, max-statements */
import React, {
  ChangeEvent,
  ReactNode,
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
  Fragment,
  useMemo
} from 'react'
import cx from 'classnames'
import { Theme, makeStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import { BaseProps, SizeType } from '@toptal/picasso-shared'

import OutlinedInput from '../OutlinedInput'
import Popper from '../Popper'
import InputAdornment from '../InputAdornment'
import Loader from '../Loader'
import { DropdownArrows16 } from '../Icon'
import NativeSelect from './NativeSelect'
import { isSubstring, disableUnsupportedProps } from '../utils'
import { FeatureOptions } from '../utils/disable-unsupported-props'
import { Option, IconPosition, ValueType } from './types'
import useSelect, { EMPTY_INPUT_VALUE } from './useSelect'
import { getSelection, isEmpty } from './selectValue'
import { OptionsList, getOptionText, removeDuplicatedOptions } from './options'
import styles from './styles'
import { documentable, forwardRef } from '../utils/forward-ref'

const DEFAULT_EMPTY_ARRAY_VALUE: ValueType[] = []

const useStyles = makeStyles<Theme, Props<any, any>>(styles)

/**
 * Select props are generalized over possible values in the component and whether
 * Select should be a multiselect. If you want `onChange` to take a handler that
 * can take array (for multiselect) you should set `M` to `true`. By default it's
 * single select.
 *
 * @param T The type of the value in the `Select`, can be either `number` or `string`
 * @param M The `boolean` type of the `multiple` property to indicate whether `onChange` will expect handler to accept plain `T` or array of `T`
 * @param V Technical type, don't pass type argument to it directly
 */
export interface Props<
  T extends ValueType = ValueType,
  M extends boolean = boolean,
  V = M extends true ? T[] : T
>
  extends BaseProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'onChange' | 'size' | 'color' | 'value'
    > {
  /** If true, the 'Select' will be disabled */
  disabled?: boolean
  /** Indicate whether `Select` is in error state */
  error?: boolean
  /** Component ID */
  id?: string
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Width of the menu */
  menuWidth?: string
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Placeholder option which is selected by default */
  placeholder?: string
  /** Whether icon should be placed at the beginning or end of the `Input` */
  iconPosition?: IconPosition
  /** Specify icon which should be rendered inside Input */
  icon?: ReactNode
  /** Whether `Select` should be rendered as native HTML `<select />` */
  native?: boolean
  /** Callback invoked when `Select` changes its state. */
  onChange?: (
    event: ChangeEvent<{
      name?: string | undefined
      value: V
    }>
  ) => void
  /** Callback invoked when filter input changed */
  onSearchChange?: (value: string) => void
  /** List of options to be rendered as `Select` */
  options: Option<T>[]
  /** Callback responsible for rendering the option given the option and its index in the list of options */
  renderOption?: (option: Option<T>, index?: number) => ReactNode
  /** A function that takes a display value from the option item */
  getDisplayValue?: (option: Option<T> | null) => string
  /** Selected value */
  value?: V
  /** Allow selecting multiple values */
  multiple?: M
  /**
   * Size of component
   * @default medium
   */
  size?: SizeType<'small' | 'medium'>
  /** Whether to render reset icon which clears selected value */
  enableReset?: boolean
  popperContainer?: HTMLElement
  /** A threshold of the number of options, defines when to start showing search for Select */
  searchThreshold?: number
  /** Specifies whether the autofill enabled or not, disabled by default */
  enableAutofill?: boolean
  ref?: React.Ref<HTMLInputElement>
}

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
      const {
        className,
        style,
        width,
        menuWidth,
        loading,
        id,
        icon,
        iconPosition,
        name,
        native,
        options: allOptions,
        renderOption,
        placeholder,
        disabled,
        error,
        onChange,
        onSearchChange,
        onBlur,
        multiple,
        value = multiple ? DEFAULT_EMPTY_ARRAY_VALUE : '',
        getDisplayValue,
        size,
        enableReset,
        popperContainer,
        searchThreshold,
        enableAutofill,
        autoComplete,
        ...rest
      } = purifyProps(props)

      const classes = useStyles(props)

      const emptySelectValue: string | string[] = multiple ? [] : ''

      const fireOnChangeEvent = useCallback(
        ({ event, value }: { event: any; value: ValueType | ValueType[] }) => {
          event.persist()
          event.target = { value, name }
          onChange!(event)
        },
        [name, onChange]
      )

      const inputWrapperRef = useRef<HTMLDivElement>(null)
      const [selectedOptions, setSelectedOptions] = useState(
        allOptions.filter(option =>
          Array.isArray(value)
            ? value.includes(String(option.value))
            : value === String(option.value)
        )
      )
      const select = getSelection(
        removeDuplicatedOptions([...allOptions, ...selectedOptions]),
        value
      )
      const [inputValue, setInputValue] = useState(
        select.display(getDisplayValue!)
      )
      const [filterOptionsValue, setFilterOptionsValue] = useState(
        EMPTY_INPUT_VALUE
      )
      const options = useMemo(
        () =>
          allOptions.filter(option =>
            isSubstring(filterOptionsValue, getDisplayValue!(option))
          ),
        [allOptions, filterOptionsValue, getDisplayValue]
      )

      const prevValue = useRef(value)
      if (prevValue.current !== value) {
        const select = getSelection(
          removeDuplicatedOptions([...allOptions, ...selectedOptions]),
          value
        )
        setInputValue(select.display(getDisplayValue!))
        prevValue.current = value
      }

      const handleFocus = () => {
        setFilterOptionsValue(EMPTY_INPUT_VALUE)
      }

      const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!multiple) {
          const hasValue = inputValue !== EMPTY_INPUT_VALUE
          const isInputCleaned = !hasValue && !isEmpty(value)

          if (isInputCleaned) {
            fireOnChangeEvent({ event, value: EMPTY_INPUT_VALUE })
            setInputValue(EMPTY_INPUT_VALUE)
          } else {
            const select = getSelection(
              removeDuplicatedOptions([...allOptions, ...selectedOptions]),
              value
            )

            setInputValue(select.display(getDisplayValue!))
          }
        }

        setFilterOptionsValue(EMPTY_INPUT_VALUE)
        onBlur!(event)
      }

      const handleChange = (newValue: string) => {
        setInputValue(newValue)
        onSearchChange!(newValue)
        setFilterOptionsValue(newValue)
      }

      const toggleMultipleSelectValue = (
        value: ValueType[],
        option: Option
      ) => {
        const isInSelectedValues = value.includes(String(option.value))

        if (isInSelectedValues) {
          return value!.filter(value => value !== option.value)
        }
        return [...value, String(option.value)]
      }
      const handleSelect = useCallback(
        (event: React.SyntheticEvent, option: Option | null) => {
          let newValue: ValueType | ValueType[]

          if (option === null) {
            newValue = emptySelectValue
          } else if (multiple && Array.isArray(value)) {
            newValue = toggleMultipleSelectValue(value, option)
          } else {
            newValue = option.value
          }

          setSelectedOptions(
            allOptions.filter(option =>
              Array.isArray(newValue)
                ? newValue.includes(String(option.value))
                : newValue === String(option.value)
            )
          )
          fireOnChangeEvent({ event, value: newValue })
          setFilterOptionsValue(EMPTY_INPUT_VALUE)
        },
        [
          allOptions,
          emptySelectValue,
          setFilterOptionsValue,
          fireOnChangeEvent,
          multiple,
          value
        ]
      )

      const {
        highlightedIndex,
        setHighlightedIndex,
        isOpen,
        getItemProps,
        getInputProps,
        getRootProps
      } = useSelect({
        value: inputValue,
        options,
        onSelect: handleSelect,
        onChange: handleChange,
        onBlur: handleBlur,
        onFocus: handleFocus
      })

      const iconAdornment = icon ? (
        <InputAdornment disabled={disabled} position={iconPosition!}>
          {icon}
        </InputAdornment>
      ) : null

      const loadingComponent = (
        <InputAdornment position='end'>
          <Loader size='small' />
        </InputAdornment>
      )

      const dropDownIcon = (
        <DropdownArrows16
          className={cx(classes.caret, {
            [classes.caretDisabled]: disabled
          })}
        />
      )

      const startAdornment = iconPosition === 'start' && iconAdornment
      const endAdornment = loading
        ? loadingComponent
        : iconPosition === 'end' && iconAdornment

      const nativeSelectComponent = (
        <NativeSelect
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          ref={ref}
          error={error}
          disabled={disabled}
          name={name}
          id={id}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          width={width}
          multiple={multiple}
          size={size}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          options={options}
          selectedOptions={selectedOptions}
          renderOption={renderOption}
          emptySelectValue={emptySelectValue}
          getInputProps={getInputProps}
          getItemProps={getItemProps}
        />
      )

      const readOnlyInput = multiple || allOptions.length <= searchThreshold!

      const selectComponent = (
        <Fragment>
          <div
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getRootProps()}
            className={classes.inputWrapper}
          >
            {!enableAutofill && !native && name && (
              <input type='hidden' value={inputValue} name={name} />
            )}
            <OutlinedInput
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}
              ref={ref}
              error={error}
              disabled={disabled}
              id={id}
              startAdornment={startAdornment}
              endAdornment={endAdornment}
              // Input specific props
              value={inputValue}
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...getInputProps({
                canCloseOnEnter: !multiple
              })}
              placeholder={placeholder}
              width={width}
              readOnly={readOnlyInput}
              defaultValue={undefined}
              className={cx(classes.input, {
                [classes.readOnlyInput]: readOnlyInput
              })}
              inputProps={{
                className: cx({
                  [classes.readOnlyInput]: readOnlyInput
                }),
                size: 1 // let input to have smallest width by default for width:'shrink'
              }}
              size={size}
              role='textbox'
              enableReset={enableReset ? select.isSelected() : false}
              autoComplete={
                enableAutofill ? autoComplete : autoComplete || 'off'
              }
              name={enableAutofill ? name : undefined}
            />
            {dropDownIcon}
          </div>
          {Boolean(options.length) && !disabled && (
            <Popper
              autoWidth
              width={menuWidth}
              placement='bottom-start'
              open={isOpen}
              anchorEl={inputWrapperRef.current}
              container={popperContainer}
            >
              {isOpen && (
                <OptionsList
                  options={options}
                  renderOption={renderOption}
                  highlightedIndex={highlightedIndex}
                  setHighlightedIndex={setHighlightedIndex}
                  onItemSelect={handleSelect}
                  getItemProps={getItemProps}
                  value={value}
                  getDisplayValue={getDisplayValue}
                  multiple={multiple}
                  size={size}
                />
              )}
            </Popper>
          )}
        </Fragment>
      )

      return (
        <div
          className={cx(
            classes.root,
            className,
            classes[`root${capitalize(width!)}`]
          )}
          style={style}
          ref={inputWrapperRef}
        >
          {native ? nativeSelectComponent : selectComponent}
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
  native: false,
  onChange: () => {},
  onSearchChange: () => {},
  onBlur: () => {},
  renderOption: (option: Option) => option.text,
  size: 'medium',
  width: 'full',
  searchThreshold: 4,
  enableAutofill: false
}

Select.displayName = 'Select'

export default Select

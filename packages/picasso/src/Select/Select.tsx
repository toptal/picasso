/* eslint-disable max-lines, complexity, max-lines-per-function, max-statements */
import React, {
  ChangeEvent,
  ReactNode,
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
  Fragment,
  useLayoutEffect
} from 'react'
import cx from 'classnames'
import NativeSelect from '@material-ui/core/NativeSelect'
import { Theme, makeStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import { BaseProps, SizeType } from '@toptal/picasso-shared'

import OutlinedInput from '../OutlinedInput'
import Popper from '../Popper'
import ScrollMenu from '../ScrollMenu'
import InputAdornment from '../InputAdornment'
import MenuItem from '../MenuItem'
import Loader from '../Loader'
import { DropdownArrows16 } from '../Icon'
import { isSubstring, disableUnsupportedProps } from '../utils'
import { FeatureOptions } from '../utils/disable-unsupported-props'
import { Option } from './types'
import useSelect, { EMPTY_INPUT_VALUE, ItemProps } from './useSelect'
import styles from './styles'
import { documentable, forwardRef } from '../utils/forward-ref'

type IconPosition = 'start' | 'end'
export type ValueType = string | number

const useStyles = makeStyles<Theme, Props<any, any>>(styles)

const getOptionText = (option: Option | null) =>
  (option && option.text) || EMPTY_INPUT_VALUE

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

type Selection = {
  isSelected(): boolean
  isOptionSelected(option: Option): boolean
  isOptionCheckmarked(option: Option): boolean
  display(getDisplayValue: (option: Option | null) => string): string
}

type NativePlaceholderProps = Pick<Props, 'placeholder'> & {
  emptySelectValue: string | string[]
}

type NativeOptionsProps = Pick<Props, 'options' | 'renderOption'> & {
  getItemProps: (index: number, option: Option) => ItemProps
}

type OptionsProps = Pick<
  Props,
  'options' | 'value' | 'multiple' | 'renderOption' | 'getDisplayValue' | 'size'
> & {
  highlightedIndex: number | null
  setHighlightedIndex: (index: number | null) => void
  getItemProps: (index: number, option: Option) => ItemProps
  onItemSelect: (event: React.MouseEvent, option: Option) => void
}

const renderNativePlaceholder = ({
  emptySelectValue,
  placeholder
}: NativePlaceholderProps) => (
  <option disabled value={emptySelectValue}>
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
    const { close: _, ...rest } = getItemProps(index, option)

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

interface SelectOptionProps {
  children?: ReactNode
  onMouseDown: (event: React.MouseEvent) => void
  close: () => void
  selected: boolean
  checkmarked: boolean
  multiple?: boolean
  size?: SizeType<'small' | 'medium'>
  index: number
  setHighlightedIndex: OptionsProps['setHighlightedIndex']
  onItemSelect: OptionsProps['onItemSelect']
  option: Option
}

const SelectOption = React.memo(
  ({
    option,
    size,
    onMouseDown,
    selected,
    checkmarked,
    setHighlightedIndex,
    index,
    onItemSelect,
    multiple,
    children,
    close
  }: SelectOptionProps) => {
    return (
      <MenuItem
        role='option'
        aria-selected={selected}
        value={option.value}
        size={size}
        selected={selected}
        checkmarked={checkmarked}
        onMouseDown={onMouseDown}
        onMouseEnter={() => {
          if (selected) {
            return
          }

          setHighlightedIndex(index)
        }}
        onClick={(event: React.MouseEvent) => {
          if (!multiple) {
            close()
          }

          onItemSelect(event, option)
        }}
      >
        {children}
      </MenuItem>
    )
  }
)

const getMultipleSelection = (
  allOptions: Option[],
  value: ValueType[]
): Selection => {
  const getSelectedOptions = () =>
    allOptions.filter(option => value.includes(String(option.value)))

  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      getSelectedOptions()
        .map(getDisplayValue)
        .join(', '),
    isSelected: () => !isEmpty(value),
    isOptionSelected: () => false,
    isOptionCheckmarked: option => value.includes(String(option.value))
  }
}

const getSingleSelection = (
  allOptions: Option[],
  value?: ValueType
): Selection => {
  const getSelectedOption = () =>
    allOptions.find(option => option.value === value) || null

  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      getDisplayValue(getSelectedOption()),
    isSelected: () => !isEmpty(value),
    isOptionSelected: option => String(option.value) === value,
    isOptionCheckmarked: () => false
  }
}

const getSelection = (allOptions: Option[], value?: ValueType | ValueType[]) =>
  Array.isArray(value)
    ? getMultipleSelection(allOptions, value as ValueType[])
    : getSingleSelection(allOptions, value as ValueType | undefined)

const isEmpty = (value?: ValueType | ValueType[]) =>
  Array.isArray(value) ? value.length === 0 : value === ''

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

const renderOptions = ({
  options,
  renderOption,
  highlightedIndex,
  setHighlightedIndex,
  onItemSelect,
  getItemProps,
  value,
  multiple,
  size
}: OptionsProps) => {
  const optionComponents = options.map((option, currentIndex) => {
    const { close, onMouseDown } = getItemProps(currentIndex, option)
    const selection = getSelection(options, value)
    return (
      <SelectOption
        key={option.key || option.value}
        option={option}
        size={size}
        onMouseDown={onMouseDown}
        selected={
          selection.isOptionSelected(option) ||
          highlightedIndex === currentIndex
        }
        checkmarked={selection.isOptionCheckmarked(option)}
        setHighlightedIndex={setHighlightedIndex}
        index={currentIndex}
        multiple={multiple}
        close={close}
        onItemSelect={onItemSelect}
      >
        {renderOption?.(option)}
      </SelectOption>
    )
  })

  return (
    <ScrollMenu selectedIndex={highlightedIndex}>{optionComponents}</ScrollMenu>
  )
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
        onBlur,
        multiple,
        value = multiple ? [] : '',
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
      const select = getSelection(allOptions, value)
      const [inputValue, setInputValue] = useState(
        select.display(getDisplayValue!)
      )
      const [options, setOptions] = useState(allOptions)

      useLayoutEffect(() => {
        const select = getSelection(allOptions, value)

        setInputValue(select.display(getDisplayValue!))
      }, [allOptions, getDisplayValue, value])

      const filterOptions = useCallback(
        (subStr: string) => {
          const filteredOptions = allOptions.filter(option =>
            isSubstring(subStr, getDisplayValue!(option))
          )

          setOptions(filteredOptions)
        },
        [allOptions, getDisplayValue]
      )

      const handleFocus = () => {
        filterOptions(EMPTY_INPUT_VALUE)
      }

      const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!multiple) {
          const hasValue = inputValue !== EMPTY_INPUT_VALUE
          const isInputCleaned = !hasValue && !isEmpty(value)

          if (isInputCleaned) {
            fireOnChangeEvent({ event, value: EMPTY_INPUT_VALUE })
            setInputValue(EMPTY_INPUT_VALUE)
          } else {
            const select = getSelection(allOptions, value)

            setInputValue(select.display(getDisplayValue!))
          }
        }

        filterOptions(EMPTY_INPUT_VALUE)
        onBlur!(event)
      }

      const handleChange = (newValue: string) => {
        setInputValue(newValue)
        filterOptions(newValue)
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
          let newValue

          if (option === null) {
            newValue = emptySelectValue
          } else if (multiple && Array.isArray(value)) {
            newValue = toggleMultipleSelectValue(value, option)
          } else {
            newValue = option.value
          }

          const select = getSelection(allOptions, newValue)

          setInputValue(select.display(getDisplayValue!))

          fireOnChangeEvent({ event, value: newValue })
          filterOptions(EMPTY_INPUT_VALUE)
        },
        [
          allOptions,
          emptySelectValue,
          filterOptions,
          fireOnChangeEvent,
          getDisplayValue,
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
        getDisplayValue: getDisplayValue!,
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

      const nativeStartAdornment = startAdornment && (
        <div className={classes.nativeStartAdornment}>{startAdornment}</div>
      )
      const nativeEndAdornment = endAdornment && (
        <div className={classes.nativeEndAdornment}>{endAdornment}</div>
      )

      const nativeSelectComponent = (
        <NativeSelect
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
          {renderNativePlaceholder({
            emptySelectValue,
            placeholder
          })}
          {renderNativeOptions({
            options,
            renderOption,
            getItemProps
          })}
        </NativeSelect>
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
              {isOpen &&
                renderOptions({
                  options,
                  renderOption,
                  highlightedIndex,
                  setHighlightedIndex,
                  onItemSelect: handleSelect,
                  getItemProps,
                  value,
                  getDisplayValue,
                  multiple,
                  size
                })}
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
  onBlur: () => {},
  renderOption: (option: Option) => option.text,
  size: 'medium',
  width: 'full',
  searchThreshold: 4,
  enableAutofill: false
}

Select.displayName = 'Select'

export default Select

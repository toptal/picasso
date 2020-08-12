/* eslint-disable max-lines, complexity, max-lines-per-function, max-statements */
import React, {
  ChangeEvent,
  ReactNode,
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
  useMemo
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
  /** Callback invoked when filter input changed */
  onSearchChange?: (value: string) => void
  /** Label to show when no options were found */
  noOptionsText?: string
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
  display(getDisplayValue: (option: Option | null) => string): string
}

type NativePlaceholderProps = Pick<Props, 'placeholder'> & {
  emptySelectValue: string | string[]
  disabled: boolean
}

type NativeOptionsProps = Pick<Props, 'options' | 'renderOption'> & {
  getItemProps: (index: number, option: Option) => ItemProps
}

type OptionsProps = Pick<
  Props,
  | 'options'
  | 'value'
  | 'multiple'
  | 'renderOption'
  | 'getDisplayValue'
  | 'size'
  | 'noOptionsText'
> & {
  highlightedIndex: number | null
  inputValue: string
  getItemProps: (index: number, option: Option) => ItemProps
  onItemSelect: (event: React.MouseEvent, option: Option) => void
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
  description?: ReactNode
  onMouseDown: (event: React.MouseEvent) => void
  onMouseEnter: () => void
  close: () => void
  selected: boolean
  highlighted: boolean
  multiple?: boolean
  size?: SizeType<'small' | 'medium'>
  onItemSelect: OptionsProps['onItemSelect']
  option: Option
}

const SelectOption = React.memo(
  ({
    option,
    size,
    onMouseDown,
    onMouseEnter,
    selected,
    highlighted,
    onItemSelect,
    multiple,
    description,
    children,
    close
  }: SelectOptionProps) => {
    return (
      <MenuItem
        role='option'
        aria-selected={highlighted}
        value={option.value}
        size={size}
        selected={highlighted}
        checkmarked={selected}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onClick={(event: React.MouseEvent) => {
          if (!multiple) {
            close()
          }

          onItemSelect(event, option)
        }}
        titleCase={false}
        description={description}
      >
        {children}
      </MenuItem>
    )
  }
)

const isOptionInSelectedValues = (option: Option, value: ValueType[]) =>
  value.includes(String(option.value))

const getMultipleSelection = (
  options: Option[],
  value: ValueType[]
): Selection => {
  const getSelectedOptions = () =>
    options.filter(option => isOptionInSelectedValues(option, value))

  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      getSelectedOptions()
        .map(getDisplayValue)
        .join(', '),
    isSelected: () => !isEmpty(value),
    isOptionSelected: option => isOptionInSelectedValues(option, value)
  }
}

const getSingleSelection = (
  options: Option[],
  value?: ValueType
): Selection => {
  const getSelectedOption = () =>
    options.find(option => option.value === value) || null

  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      getDisplayValue(getSelectedOption()),
    isSelected: () => !isEmpty(value),
    isOptionSelected: option => option.value === value
  }
}

const getSelection = (options: Option[], value?: ValueType | ValueType[]) =>
  Array.isArray(value)
    ? getMultipleSelection(options, value as ValueType[])
    : getSingleSelection(options, value as ValueType | undefined)

const removeDuplicatedOptions = (options: Option[]) =>
  options.filter((option, index) => {
    const innerIndex = options.findIndex(
      innerOption => innerOption.value === option.value
    )
    return innerIndex === index
  })

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
  onItemSelect,
  getItemProps,
  value,
  multiple,
  size,
  inputValue,
  noOptionsText
}: OptionsProps) => {
  if (!options.length && inputValue) {
    return (
      <ScrollMenu>
        <MenuItem titleCase={false} disabled>
          {noOptionsText}
        </MenuItem>
      </ScrollMenu>
    )
  }

  const optionComponents = options.map((option, currentIndex) => {
    const { close, onMouseDown, onMouseEnter } = getItemProps(
      currentIndex,
      option
    )
    const selection = getSelection(options, value)
    return (
      <SelectOption
        key={option.key || option.value}
        option={option}
        size={size}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        selected={selection.isOptionSelected(option)}
        highlighted={highlightedIndex === currentIndex}
        multiple={multiple}
        close={close}
        onItemSelect={onItemSelect}
        description={option.description}
      >
        {renderOption?.(option)}
      </SelectOption>
    )
  })

  return (
    <ScrollMenu data-testid='select-dropdown' selectedIndex={highlightedIndex}>
      {optionComponents}
    </ScrollMenu>
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
        noOptionsText,
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
            ? isOptionInSelectedValues(option, value)
            : value === String(option.value)
        )
      )
      const select = useMemo(
        () =>
          getSelection(
            removeDuplicatedOptions([...allOptions, ...selectedOptions]),
            value
          ),
        [allOptions, selectedOptions, value]
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

      const selectedIndices = useMemo(
        () =>
          options.reduce(
            (selected: number[], option: Option, index: number) =>
              select.isOptionSelected(option) ? [...selected, index] : selected,
            []
          ),
        [options, select]
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

      const readOnlyInput = multiple || allOptions.length <= searchThreshold!

      const handleFocus = (
        event: React.FocusEvent<HTMLInputElement | HTMLDivElement>
      ) => {
        if (!readOnlyInput && 'select' in event.target) {
          event.target.select()
        }
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
        const isInSelectedValues = isOptionInSelectedValues(option, value)

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
                ? isOptionInSelectedValues(option, newValue)
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
        isOpen,
        getItemProps,
        getInputProps,
        getRootProps
      } = useSelect({
        value: inputValue,
        options,
        selectedIndices,
        disabled,
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

      const selectComponent = (
        <>
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
          {!disabled && (
            <Popper
              autoWidth
              width={menuWidth}
              placement='bottom-start'
              open={isOpen}
              anchorEl={inputWrapperRef.current}
              container={popperContainer}
            >
              {isOpen &&
                !loading &&
                renderOptions({
                  options,
                  renderOption,
                  highlightedIndex,
                  onItemSelect: handleSelect,
                  getItemProps,
                  value,
                  getDisplayValue,
                  multiple,
                  size,
                  noOptionsText,
                  inputValue
                })}
            </Popper>
          )}
        </>
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
  noOptionsText: 'No matches found',
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

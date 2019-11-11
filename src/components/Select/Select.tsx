import React, {
  forwardRef,
  ChangeEvent,
  ReactNode,
  ReactText,
  InputHTMLAttributes,
  useRef,
  useState,
  Fragment
} from 'react'
import cx from 'classnames'
import Popper from '@material-ui/core/Popper'
import NativeSelect from '@material-ui/core/NativeSelect'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'

import Input from '../Input'
import OutlinedInput from '../OutlinedInput'
import ScrollMenu from '../ScrollMenu'
import InputAdornment from '../InputAdornment'
import MenuItem from '../MenuItem'
import Loader from '../Loader'
import { StandardProps } from '../Picasso'
import { DropdownArrows16 } from '../Icon'
import { isSubstring, useWidthOf } from '../utils'
import { Option } from './types'
import useSelect, { EMPTY_INPUT_VALUE, ItemProps } from './useSelect'
import styles from './styles'

type IconPosition = 'start' | 'end'
type ValueType = string | string[] | number

const getOptionText = (option: Option | null) =>
  (option && option.text) || EMPTY_INPUT_VALUE

export interface Props
  extends StandardProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** If true, the 'Select' will be disabled */
  disabled?: boolean
  /** Indicate whether `Select` is in error state */
  error?: boolean
  /** Component ID */
  id?: string
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
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
    event: ChangeEvent<{ name?: string | undefined; value: ValueType }>
  ) => void
  /** List of options to be rendered as `Select` */
  options: Option[]
  /** Callback responsible for rendering the option given the option and its index in the list of options */
  renderOption?: (option: Option, index?: number) => ReactNode
  /** A function that takes a display value from the option item */
  getDisplayValue?: (option: Option | null) => string
  /** Selected value */
  value?: ValueType
  /** Allow selecting multiple values */
  multiple?: boolean
}

type Selection = {
  isSelected(): boolean
  display(): string
}

type NativePlaceholderProps = Pick<Props, 'placeholder'> & {
  emptySelectValue: ValueType
}

type NativeOptionsProps = Pick<Props, 'options' | 'renderOption'> & {
  getItemProps: (index: number, option: Option) => ItemProps
}

type OptionsProps = Pick<
  Props,
  'options' | 'value' | 'multiple' | 'renderOption' | 'getDisplayValue'
> & {
  highlightedIndex: number | null
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
    const { close: _, selected: __, ...rest } = getItemProps(index, option)

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

const renderOptions = ({
  options,
  renderOption,
  highlightedIndex,
  onItemSelect,
  getItemProps,
  value,
  multiple
}: OptionsProps) => {
  const optionComponents = options.map((option, index) => {
    const { selected, close, ...rest } = getItemProps(index, option)

    const isSelected =
      multiple && Array.isArray(value)
        ? value.includes(String(option.value)) || selected
        : selected

    return (
      <MenuItem
        key={option.key || option.value}
        value={option.value}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        selected={isSelected}
        onClick={(event: React.MouseEvent) => {
          if (!multiple) {
            close()
          }
          onItemSelect(event, option)
        }}
      >
        {renderOption!(option)}
      </MenuItem>
    )
  })

  return (
    <ScrollMenu selectedIndex={highlightedIndex}>{optionComponents}</ScrollMenu>
  )
}

const getMultipleSelection = (
  allOptions: Option[],
  value: string[],
  getDisplayValue: (option: Option | null) => string
): Selection => {
  const selectedOptions = () =>
    allOptions.filter(option => value.includes(String(option.value)))

  return {
    display: () =>
      selectedOptions()
        .map(getDisplayValue)
        .join(', '),
    isSelected: () => !isEmpty(value)
  }
}

const getSingleSelection = (
  allOptions: Option[],
  value: ReactText,
  getDisplayValue: (option: Option | null) => string
): Selection => {
  const selectedOption = () =>
    allOptions.find(option => option.value === value) || null

  return {
    display: () => getDisplayValue(selectedOption()),
    isSelected: () => !isEmpty(value)
  }
}

const getSelection = (
  allOptions: Option[],
  value: ValueType,
  getDisplayValue: (option: Option | null) => string
) =>
  Array.isArray(value)
    ? getMultipleSelection(allOptions, value, getDisplayValue)
    : getSingleSelection(allOptions, value, getDisplayValue)

const isEmpty = (value: ValueType) =>
  Array.isArray(value) ? value.length === 0 : value === ''

const isEqual = (val1: ValueType, val2: ValueType) =>
  Array.isArray(val1) && Array.isArray(val2)
    ? val1.every(value => val2.includes(value))
    : val1 === val2

export const Select = forwardRef<HTMLInputElement, Props>(function Select(
  {
    classes,
    className,
    style,
    width,
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
    multiple,
    value = multiple ? [] : '',
    getDisplayValue,
    tabIndex = 0,
    ...rest
  },
  ref
) {
  const fireOnChangeEvent = ({
    event,
    value
  }: {
    event: any
    value: ValueType
  }) => {
    event.persist()
    event.target = { value, name }
    onChange!(event)
  }

  const inputWrapperRef = useRef<HTMLDivElement>(null)
  const select = getSelection(allOptions, value, getDisplayValue!)
  const [inputValue, setInputValue] = useState(select.display())
  const [options, setOptions] = useState(allOptions)
  const menuWidth = useWidthOf<HTMLDivElement>(inputWrapperRef)
  const tabIndexValue = !disabled ? tabIndex : undefined

  // getDerivedStateFromProps for value prop
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  const [prevValue, setPrevValue] = useState<ValueType>(value)

  if (!isEqual(prevValue, value)) {
    const select = getSelection(allOptions, value, getDisplayValue!)

    setInputValue(select.display())
    setPrevValue(value)
  }

  const filterOptions = (subStr: string) => {
    const filteredOptions = allOptions.filter(option =>
      isSubstring(subStr, getDisplayValue!(option))
    )

    setOptions(filteredOptions)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!multiple) {
      const hasValue = inputValue !== EMPTY_INPUT_VALUE
      const isInputCleaned = !hasValue && !isEmpty(value)

      if (isInputCleaned) {
        fireOnChangeEvent({ event, value: EMPTY_INPUT_VALUE })
        setInputValue(EMPTY_INPUT_VALUE)
      } else {
        const select = getSelection(allOptions, value, getDisplayValue!)

        setInputValue(select.display())
      }
    }

    filterOptions(EMPTY_INPUT_VALUE)
  }

  const handleChange = (newValue: string) => {
    setInputValue(newValue)
    filterOptions(newValue)
  }

  const handleSelect = (event: React.SyntheticEvent, option: Option) => {
    let newValue

    if (multiple && Array.isArray(value)) {
      const isInSelectedValues = value.includes(String(option.value))

      if (isInSelectedValues) {
        newValue = value!.filter(value => value !== option.value)
      } else {
        newValue = [...value, String(option.value)]
      }
    } else {
      newValue = option.value
    }

    const select = getSelection(allOptions, newValue, getDisplayValue!)

    setInputValue(select.display())

    fireOnChangeEvent({ event, value: newValue })
    filterOptions(EMPTY_INPUT_VALUE)
  }

  const {
    highlightedIndex,
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
    onBlur: handleBlur
  })

  const emptySelectValue = multiple ? [] : ''

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
          className={classes.selectWrapper}
          inputProps={{ multiple }}
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
          [classes.nativeStartAdornmentPadding]: Boolean(nativeStartAdornment),
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

  const selectComponent = (
    <Fragment>
      <div
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...getRootProps()}
        tabIndex={tabIndexValue}
        className={classes.inputWrapper}
      >
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          ref={ref}
          error={error}
          disabled={disabled}
          name={name}
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
          readOnly={multiple}
          defaultValue={undefined}
          className={cx(classes.input, {
            [classes.inputMultiple]: multiple
          })}
          inputProps={{
            className: cx({
              [classes.inputMultiple]: multiple
            })
          }}
          size={1} // let input to have smallest width by default
          role='textbox'
        />
        {dropDownIcon}
      </div>
      {Boolean(options.length) && (
        <Popper
          open={isOpen && !disabled}
          anchorEl={inputWrapperRef.current}
          className={classes.popper}
          style={{ width: menuWidth }}
        >
          {renderOptions({
            options,
            renderOption,
            highlightedIndex,
            onItemSelect: handleSelect,
            getItemProps,
            value,
            getDisplayValue,
            multiple
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
})

Select.defaultProps = {
  disabled: false,
  error: false,
  getDisplayValue: getOptionText,
  iconPosition: 'start',
  loading: false,
  native: false,
  onChange: () => {},
  renderOption: (option: Option) => option.text,
  width: 'full'
}

Select.displayName = 'Select'

export default withStyles(styles)(Select)

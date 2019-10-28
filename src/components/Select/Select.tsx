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
import { StandardProps } from '../Picasso'
import { DropdownArrows16 } from '../Icon'
import { isSubstring, useWidthOf } from '../utils'
import { Option } from './types'
import useSelect, { EMPTY_INPUT_VALUE, ItemProps } from './useSelect'
import styles from './styles'

type IconPosition = 'start' | 'end'
type ValueType = string | string[] | number

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

type NativeOptionsProps = Pick<Props, 'options'> & {
  getItemProps: (index: number, option: Option) => ItemProps
}

type OptionsProps = Pick<Props, 'options' | 'value' | 'multiple'> & {
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

const renderNativeOptions = ({ options, getItemProps }: NativeOptionsProps) =>
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
        {option.text}
      </option>
    )
  })

const renderOptions = ({
  options,
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
        {option.text}
      </MenuItem>
    )
  })

  return (
    <ScrollMenu selectedIndex={highlightedIndex}>{optionComponents}</ScrollMenu>
  )
}

const getMultipleSelection = (
  allOptions: Option[],
  value: string[]
): Selection => {
  const selectedOptions = () =>
    allOptions.filter(option => value.includes(String(option.value)))

  return {
    display: () =>
      selectedOptions()
        .map(({ text }) => text)
        .join(', '),
    isSelected: () => !isEmpty(value)
  }
}

const getSingleSelection = (
  allOptions: Option[],
  value: ReactText
): Selection => {
  const defaultOption = { text: '', value: '' }
  const selectedOption = () =>
    allOptions.find(option => option.value === value) || defaultOption

  return {
    display: () => getDisplayValue(selectedOption()),
    isSelected: () => !isEmpty(value)
  }
}

const getSelection = (allOptions: Option[], value: ValueType) =>
  Array.isArray(value)
    ? getMultipleSelection(allOptions, value)
    : getSingleSelection(allOptions, value)

const getDisplayValue = (option: Option) => String(option.text!)

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
    id,
    icon,
    iconPosition,
    name,
    native,
    options: allOptions,
    placeholder,
    disabled,
    error,
    onChange,
    multiple,
    value = multiple ? [] : '',
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
  const select = getSelection(allOptions, value)
  const [inputValue, setInputValue] = useState(select.display())
  const [options, setOptions] = useState(allOptions)
  const menuWidth = useWidthOf<HTMLDivElement>(inputWrapperRef)
  const tabIndexValue = !disabled ? tabIndex : undefined

  // getDerivedStateFromProps for value prop
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  const [prevValue, setPrevValue] = useState<ValueType>(value)

  if (!isEqual(prevValue, value)) {
    const select = getSelection(allOptions, value)

    setInputValue(select.display())
    setPrevValue(value)
  }

  const filterOptions = (subStr: string) => {
    const filteredOptions = allOptions.filter(option =>
      isSubstring(subStr, getDisplayValue(option))
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
        const select = getSelection(allOptions, value)

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

    const select = getSelection(allOptions, newValue)

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
    getDisplayValue: option => {
      if (!option) {
        return EMPTY_INPUT_VALUE
      }

      return String(option.text)
    },
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

  const dropDownIcon = (
    <DropdownArrows16
      className={cx(classes.caret, {
        [classes.caretDisabled]: disabled
      })}
    />
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
      startAdornment={iconPosition === 'start' && iconAdornment}
      endAdornment={iconPosition === 'end' && iconAdornment}
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
        })
      }}
    >
      {renderNativePlaceholder({
        emptySelectValue,
        placeholder
      })}
      {renderNativeOptions({
        options,
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
          startAdornment={iconPosition === 'start' && iconAdornment}
          endAdornment={iconPosition === 'end' && iconAdornment}
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
            highlightedIndex,
            onItemSelect: handleSelect,
            getItemProps,
            value,
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
  iconPosition: 'start',
  native: false,
  onChange: () => {},
  width: 'full'
}

Select.displayName = 'Select'

export default withStyles(styles)(Select)

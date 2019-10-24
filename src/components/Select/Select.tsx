import React, {
  forwardRef,
  ChangeEvent,
  ReactNode,
  ReactText,
  InputHTMLAttributes,
  useRef,
  useState,
  useLayoutEffect
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
import { isSubstring } from '../utils'
import styles from './styles'

interface Option {
  key?: number
  text: ReactNode
  value: string | number
}

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

interface Select {
  isSelected(): boolean
  display(): string
}

function createSelectMultiple(allOptions: Option[], value: string[]): Select {
  const isSelected = () => !isEmpty(value)

  const display = () =>
    selectedOptions()
      .map(({ text }) => text)
      .join(', ')

  const selectedOptions = () =>
    allOptions.filter(option => value.includes(String(option.value)))

  return {
    display,
    isSelected
  }
}

function createSelectSingle(allOptions: Option[], value: ReactText): Select {
  const isSelected = () => !isEmpty(value)

  const defaultOption = { text: '', value: '' }

  const selectedOption = () =>
    allOptions.find(option => option.value === value) || defaultOption

  const display = () => getDisplayValue(selectedOption())

  return {
    display,
    isSelected
  }
}

const renderOptions = (
  options: Option[],
  value: ValueType,
  highlightedIndex: number,
  onItemClick: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    option: Option
  ) => void,
  isNative?: boolean
) => {
  if (!options.length) {
    return null
  }

  const OptionComponent = isNative ? 'option' : MenuItem

  const optionComponents = options.map(option => (
    <OptionComponent
      key={option.key || option.value}
      value={option.value}
      onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) =>
        onItemClick(event, option)
      }
      onMouseDown={(event: any) => {
        // This prevents the activeElement from being changed
        // to the item so it can remain with the current activeElement
        // which is a more common use case.
        event!.preventDefault()
      }}
      selected={
        Array.isArray(value) && value.some(value => value === option.value)
      }
    >
      {option.text}
    </OptionComponent>
  ))

  if (isNative) {
    return optionComponents
  }

  const resultOptions = (
    <ScrollMenu selectedIndex={highlightedIndex}>{optionComponents}</ScrollMenu>
  )

  return resultOptions
}

const getDisplayValue = (option: Option) => String(option.text!)

const getSelected = (allOptions: Option[], value: ValueType) =>
  Array.isArray(value)
    ? createSelectMultiple(allOptions, value)
    : createSelectSingle(allOptions, value)

const isEmpty = (value: ValueType) =>
  Array.isArray(value) ? value.length === 0 : value === ''

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
  const [menuWidth, setMenuWidth] = useState()

  const select = getSelected(allOptions, value)
  const [inputValue, setInputValue] = useState(select.display())
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState(allOptions)
  const [highlightedIndex] = useState(0)
  const tabIndexValue = !disabled ? tabIndex : undefined

  // getDerivedStateFromProps for value prop
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  const [prevValue, setPrevValue] = useState<ValueType | null>(null)

  if (prevValue !== value) {
    const select = getSelected(allOptions, value)

    setInputValue(select.display())
    setPrevValue(value)
  }

  const filterOptions = (subStr: string) => {
    const filteredOptions = allOptions.filter(option =>
      isSubstring(subStr, getDisplayValue(option))
    )

    setOptions(filteredOptions)
  }

  useLayoutEffect(() => {
    if (!inputWrapperRef.current) {
      return
    }
    const { width } = inputWrapperRef.current.getBoundingClientRect()

    setMenuWidth(`${width}px`)
  }, [inputWrapperRef.current])

  const handleFocusOrClick = () => {
    setOpen(true)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!multiple) {
      const hasValue = inputValue !== ''
      const isInputCleaned = !hasValue && !isEmpty(value)

      if (isInputCleaned) {
        fireOnChangeEvent({ event, value: '' })
        setInputValue('')
      } else {
        const select = getSelected(allOptions, value)

        setInputValue(select.display())
      }
    }

    filterOptions('')
    setOpen(false)
  }

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const newValue = event.target.value

    setInputValue(newValue)
    filterOptions(newValue)
  }

  const handleItemClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    option: Option
  ) => {
    let newValue

    if (multiple && Array.isArray(value)) {
      const isInSelectedValues = value.some(value => value === option.value)

      if (isInSelectedValues) {
        newValue = value!.filter(value => value !== option.value)
      } else {
        newValue = [...value, String(option.value)]
      }
    } else {
      newValue = option.value
    }

    const select = getSelected(allOptions, newValue)

    setInputValue(select.display())

    fireOnChangeEvent({ event, value: newValue })

    if (!multiple) {
      setOpen(false)
    }
  }

  const isOpen = open && !disabled
  const shouldShowOptions = !native && Boolean(options.length)

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
      <option disabled value={multiple ? [] : ''}>
        {placeholder}
      </option>
      {renderOptions(options, value, highlightedIndex, handleItemClick, true)}
    </NativeSelect>
  )

  const inputComponent = (
    <div
      onClick={handleFocusOrClick}
      onFocus={handleFocusOrClick}
      onBlur={handleBlur}
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
        onChange={handleChange}
        value={inputValue}
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
      />
      {dropDownIcon}
    </div>
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
      {native ? nativeSelectComponent : inputComponent}
      {shouldShowOptions && (
        <Popper
          open={isOpen}
          anchorEl={inputWrapperRef.current}
          className={classes.popper}
          style={{ width: menuWidth }}
        >
          {renderOptions(
            options,
            value,
            highlightedIndex,
            handleItemClick,
            false
          )}
        </Popper>
      )}
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

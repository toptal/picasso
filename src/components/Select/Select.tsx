import React, {
  forwardRef,
  ChangeEvent,
  ReactNode,
  ReactText,
  InputHTMLAttributes,
  Fragment,
  useRef,
  useState,
  useLayoutEffect
} from 'react'
import cx from 'classnames'
import Popper from '@material-ui/core/Popper'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'

import Input from '../Input'
import Container from '../Container'
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
type Value = string | string[] | number

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
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void
  /** List of options to be rendered as `Select` */
  options: Option[]
  /** Selected value */
  value?: Value
  /** Allow selecting multiple values */
  multiple?: boolean
}

interface Select {
  isSelected(): boolean
  display(): string
}

function createSelectMultiple(
  allOptions: Option[],
  selectedValues: string[]
): Select {
  const isSelected = () => !isEmpty(selectedValues)

  const display = () =>
    selectedOptions()
      .map(({ text }) => text)
      .join(', ')

  const selectedOptions = () =>
    allOptions.filter(({ value }) => selectedValues.includes(String(value)))

  return {
    display,
    isSelected
  }
}

function createSelectSingle(
  allOptions: Option[],
  selectedValue: ReactText
): Select {
  const isSelected = () => !isEmpty(selectedValue)

  const defaultOption = { text: '', value: '' }

  const selectedOption = () =>
    allOptions.find(option => option.value === selectedValue) || defaultOption

  const display = () => getDisplayValue(selectedOption())

  return {
    display,
    isSelected
  }
}

const renderOptions = (
  options: Option[],
  selectedValue: Value | null,
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
        Array.isArray(selectedValue)
          ? selectedValue.some(value => value === option.value)
          : undefined
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

const getSelected = (allOptions: Option[], value: Value) =>
  Array.isArray(value)
    ? createSelectMultiple(allOptions, value)
    : createSelectSingle(allOptions, value)

const isEmpty = (value: Value) =>
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
    ...rest
  },
  ref
) {
  const fireOnChangeEvent = ({
    event,
    value
  }: {
    event: any
    value: Value
  }) => {
    event.persist()
    event.target = { value, name }
    onChange!(event)
  }

  const inputWrapperRef = useRef<HTMLDivElement>(null)
  const [menuWidth, setMenuWidth] = useState()

  const select = getSelected(allOptions, value)
  const [inputValue, setInputValue] = useState(select.display())

  const [selectedValue, setSelectedValue] = useState<Value>(multiple ? [] : '')
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState(allOptions)
  const [highlightedIndex] = useState(0)

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
      const isInputCleaned = !hasValue && !isEmpty(selectedValue)

      if (isInputCleaned) {
        setSelectedValue('')
        fireOnChangeEvent({ event, value: '' })
        setInputValue('')
      } else {
        const select = getSelected(allOptions, selectedValue)

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

    if (multiple && Array.isArray(selectedValue)) {
      const isInSelectedValues = selectedValue.some(
        value => value === option.value
      )

      if (isInSelectedValues) {
        newValue = selectedValue!.filter(value => value !== option.value)
      } else {
        newValue = [...selectedValue, String(option.value)]
      }
    } else {
      newValue = option.value
    }

    const select = getSelected(allOptions, newValue)

    setInputValue(select.display())

    setSelectedValue(newValue)
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

  const endAdornment = (
    <Fragment>
      {iconPosition === 'end' && iconAdornment}
      {dropDownIcon}
    </Fragment>
  )

  const inputComponent = (
    <Input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={cx({
        [classes.inputReadOnly]: multiple
      })}
      ref={ref}
      error={error}
      readOnly={multiple}
      defaultValue={undefined}
      disabled={disabled}
      name={name}
      id={id}
      placeholder={placeholder}
      startAdornment={iconPosition === 'start' && iconAdornment}
      endAdornment={endAdornment}
      width={width}
      value={inputValue}
      onChange={handleChange}
      onClick={handleFocusOrClick}
      onFocus={handleFocusOrClick}
      onBlur={handleBlur}
    />
  )

  return (
    <div
      className={cx(
        classes.root,
        className,
        classes[`root${capitalize(width!)}`]
      )}
      style={style}
    >
      <Container flex ref={inputWrapperRef}>
        {inputComponent}
        {shouldShowOptions && (
          <Popper
            open={isOpen}
            anchorEl={inputWrapperRef.current}
            className={classes.popper}
            style={{ width: menuWidth }}
          >
            {renderOptions(
              options,
              selectedValue,
              highlightedIndex,
              handleItemClick,
              false
            )}
          </Popper>
        )}
      </Container>
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

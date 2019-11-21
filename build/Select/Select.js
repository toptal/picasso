var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
/* eslint-disable max-lines */
import React, { forwardRef, useRef, useState, Fragment } from 'react'
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
import { DropdownArrows16 } from '../Icon'
import { isSubstring, useWidthOf } from '../utils'
import useSelect, { EMPTY_INPUT_VALUE } from './useSelect'
import styles from './styles'
const getOptionText = option => (option && option.text) || EMPTY_INPUT_VALUE
const renderNativePlaceholder = ({ emptySelectValue, placeholder }) =>
  React.createElement(
    'option',
    { disabled: true, value: emptySelectValue },
    placeholder
  )
const renderNativeOptions = ({ options, renderOption, getItemProps }) =>
  options.map((option, index) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = getItemProps(index, option),
      { close: _, selected: __ } = _a,
      rest = __rest(_a, ['close', 'selected'])
    return React.createElement(
      'option',
      Object.assign(
        { key: option.key || option.value, value: option.value },
        rest
      ),
      renderOption(option)
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
}) => {
  const optionComponents = options.map((option, index) => {
    const _a = getItemProps(index, option),
      { selected, close } = _a,
      rest = __rest(_a, ['selected', 'close'])
    const isSelected =
      multiple && Array.isArray(value)
        ? value.includes(String(option.value)) || selected
        : selected
    return React.createElement(
      MenuItem,
      Object.assign(
        { key: option.key || option.value, value: option.value },
        rest,
        {
          selected: isSelected,
          onClick: event => {
            if (!multiple) {
              close()
            }
            onItemSelect(event, option)
          }
        }
      ),
      renderOption(option)
    )
  })
  return React.createElement(
    ScrollMenu,
    { selectedIndex: highlightedIndex },
    optionComponents
  )
}
const getMultipleSelection = (allOptions, value, getDisplayValue) => {
  const getSelectedOptions = () =>
    allOptions.filter(option => value.includes(String(option.value)))
  return {
    display: () =>
      getSelectedOptions()
        .map(getDisplayValue)
        .join(', '),
    isSelected: () => !isEmpty(value)
  }
}
const getSingleSelection = (allOptions, value, getDisplayValue) => {
  const getSelectedOption = () =>
    allOptions.find(option => option.value === value) || null
  return {
    display: () => getDisplayValue(getSelectedOption()),
    isSelected: () => !isEmpty(value)
  }
}
const getSelection = (allOptions, value, getDisplayValue) =>
  Array.isArray(value)
    ? getMultipleSelection(allOptions, value, getDisplayValue)
    : getSingleSelection(allOptions, value, getDisplayValue)
const isEmpty = value =>
  Array.isArray(value) ? value.length === 0 : value === ''
const isEqual = (val1, val2) =>
  Array.isArray(val1) && Array.isArray(val2)
    ? val1.every(value => val2.includes(value))
    : val1 === val2
export const Select = forwardRef(function Select(_a, ref) {
  var {
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
      tabIndex = 0
    } = _a,
    rest = __rest(_a, [
      'classes',
      'className',
      'style',
      'width',
      'loading',
      'id',
      'icon',
      'iconPosition',
      'name',
      'native',
      'options',
      'renderOption',
      'placeholder',
      'disabled',
      'error',
      'onChange',
      'multiple',
      'value',
      'getDisplayValue',
      'tabIndex'
    ])
  const fireOnChangeEvent = ({ event, value }) => {
    event.persist()
    event.target = { value, name }
    onChange(event)
  }
  const inputWrapperRef = useRef(null)
  const select = getSelection(allOptions, value, getDisplayValue)
  const [inputValue, setInputValue] = useState(select.display())
  const [options, setOptions] = useState(allOptions)
  const menuWidth = useWidthOf(inputWrapperRef)
  const tabIndexValue = !disabled ? tabIndex : undefined
  // getDerivedStateFromProps for value prop
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  const [prevValue, setPrevValue] = useState(value)
  if (!isEqual(prevValue, value)) {
    const select = getSelection(allOptions, value, getDisplayValue)
    setInputValue(select.display())
    setPrevValue(value)
  }
  const filterOptions = subStr => {
    const filteredOptions = allOptions.filter(option =>
      isSubstring(subStr, getDisplayValue(option))
    )
    setOptions(filteredOptions)
  }
  const handleBlur = event => {
    if (!multiple) {
      const hasValue = inputValue !== EMPTY_INPUT_VALUE
      const isInputCleaned = !hasValue && !isEmpty(value)
      if (isInputCleaned) {
        fireOnChangeEvent({ event, value: EMPTY_INPUT_VALUE })
        setInputValue(EMPTY_INPUT_VALUE)
      } else {
        const select = getSelection(allOptions, value, getDisplayValue)
        setInputValue(select.display())
      }
    }
    filterOptions(EMPTY_INPUT_VALUE)
  }
  const handleChange = newValue => {
    setInputValue(newValue)
    filterOptions(newValue)
  }
  const handleSelect = (event, option) => {
    let newValue
    if (multiple && Array.isArray(value)) {
      const isInSelectedValues = value.includes(String(option.value))
      if (isInSelectedValues) {
        newValue = value.filter(value => value !== option.value)
      } else {
        newValue = [...value, String(option.value)]
      }
    } else {
      newValue = option.value
    }
    const select = getSelection(allOptions, newValue, getDisplayValue)
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
    getDisplayValue: getDisplayValue,
    options,
    onSelect: handleSelect,
    onChange: handleChange,
    onBlur: handleBlur
  })
  const emptySelectValue = multiple ? [] : ''
  const iconAdornment = icon
    ? React.createElement(
        InputAdornment,
        { disabled: disabled, position: iconPosition },
        icon
      )
    : null
  const loadingComponent = React.createElement(
    InputAdornment,
    { position: 'end' },
    React.createElement(Loader, { size: 'small' })
  )
  const dropDownIcon = React.createElement(DropdownArrows16, {
    className: cx(classes.caret, {
      [classes.caretDisabled]: disabled
    })
  })
  const startAdornment = iconPosition === 'start' && iconAdornment
  const endAdornment = loading
    ? loadingComponent
    : iconPosition === 'end' && iconAdornment
  const nativeStartAdornment =
    startAdornment &&
    React.createElement(
      'div',
      { className: classes.nativeStartAdornment },
      startAdornment
    )
  const nativeEndAdornment =
    endAdornment &&
    React.createElement(
      'div',
      { className: classes.nativeEndAdornment },
      endAdornment
    )
  const nativeSelectComponent = React.createElement(
    NativeSelect,
    // eslint-disable-next-line react/jsx-props-no-spreading
    Object.assign({}, rest, {
      ref: ref,
      error: error,
      disabled: disabled,
      name: name,
      id: id,
      startAdornment: nativeStartAdornment,
      endAdornment: nativeEndAdornment,
      // NativeSelect specific props
      input: React.createElement(
        OutlinedInput,
        Object.assign(
          {
            width: width,
            className: classes.selectWrapper,
            inputProps: { multiple }
          },
          getInputProps({
            canCloseOnEnter: !multiple
          })
        )
      ),
      value: value,
      onChange: onChange,
      IconComponent: () => dropDownIcon,
      classes: {
        root: cx(classes.select, {
          [classes.placeholder]: !select.isSelected()
        }),
        select: cx({
          [classes.nativeStartAdornmentPadding]: Boolean(nativeStartAdornment),
          [classes.nativeEndAdornmentPadding]: Boolean(nativeEndAdornment)
        })
      }
    }),
    renderNativePlaceholder({
      emptySelectValue,
      placeholder
    }),
    renderNativeOptions({
      options,
      renderOption,
      getItemProps
    })
  )
  const selectComponent = React.createElement(
    Fragment,
    null,
    React.createElement(
      'div',
      Object.assign({}, getRootProps(), {
        tabIndex: tabIndexValue,
        className: classes.inputWrapper
      }),
      React.createElement(
        Input,
        // eslint-disable-next-line react/jsx-props-no-spreading
        Object.assign(
          {},
          rest,
          {
            ref: ref,
            error: error,
            disabled: disabled,
            name: name,
            id: id,
            startAdornment: startAdornment,
            endAdornment: endAdornment,
            // Input specific props
            value: inputValue
          },
          getInputProps({
            canCloseOnEnter: !multiple
          }),
          {
            placeholder: placeholder,
            width: width,
            readOnly: multiple,
            defaultValue: undefined,
            className: cx(classes.input, {
              [classes.inputMultiple]: multiple
            }),
            inputProps: {
              className: cx({
                [classes.inputMultiple]: multiple
              })
            },
            size: 1,
            role: 'textbox'
          }
        )
      ),
      dropDownIcon
    ),
    Boolean(options.length) &&
      React.createElement(
        Popper,
        {
          open: isOpen && !disabled,
          anchorEl: inputWrapperRef.current,
          className: classes.popper,
          style: { width: menuWidth }
        },
        renderOptions({
          options,
          renderOption,
          highlightedIndex,
          onItemSelect: handleSelect,
          getItemProps,
          value,
          getDisplayValue,
          multiple
        })
      )
  )
  return React.createElement(
    'div',
    {
      className: cx(
        classes.root,
        className,
        classes[`root${capitalize(width)}`]
      ),
      style: style,
      ref: inputWrapperRef
    },
    native ? nativeSelectComponent : selectComponent
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
  renderOption: option => option.text,
  width: 'full'
}
Select.displayName = 'Select'
export default withStyles(styles)(Select)
//# sourceMappingURL=Select.js.map

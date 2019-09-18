import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  forwardRef,
  ReactNode,
  ComponentType,
  FormEvent
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'
import cx from 'classnames'
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift'

import { StandardProps } from '../../Picasso'
import Input, { Props as InputProps } from '../../Input'
import Menu from '../../Menu'
import Loader from '../../Loader'
import ScrollMenu from '../../ScrollMenu'
import { isSubstring, Maybe } from '../../utils'
import useControlledAndUncontrolledState from '../../utils/use-controlled-and-uncontrolled-state'
import useControlledAndUncontrolledInput from '../../utils/use-controlled-and-uncontrolled-input'
import styles from './styles'

const EMPTY_INPUT_VALUE = ''
const FIRST_ITEM_INDEX = 0

type Item = {
  value?: string
  text?: string
}

/**
 * Alias for all valid HTML props for `<input>` element.
 * Does not include React's `ref` or `key`.
 */
type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>

export interface Props
  extends StandardProps,
    Omit<
      HTMLInputProps,
      'defaultValue' | 'value' | 'onChange' | 'onSelect' | 'onKeyDown'
    > {
  /** The default `input` element value. Use when the component is not controlled. */
  defaultInputValue?: string
  /** The value of the `input` element, required for a controlled component. */
  inputValue?: string
  /**  Callback invoked when `input` element value is changed */
  onChange?: (inputValue: string) => void
  /** The default selected option value. Use when the component is not controlled. */
  defaultValue?: string | null
  /** The value of the selected option, required for a controlled component. */
  value?: string | null
  /**  Callback invoked when selection changes */
  onSelect?: (itemValue: string | null) => void
  /** Placeholder for value */
  placeholder?: string
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Allow any input any value which is not in the list of `options` when blurring. Otherwise the input is reset to the last selected item label or blank. */
  allowAny?: boolean
  /** Label to show when no options were found */
  noOptionsText?: string
  /** List of options */
  options?: Item[]
  /** The minimum number of characters a user must type before the options list is displayed */
  minLength?: number
  /**  Callback invoked when key is pressed */
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  /** ReactNode for labels that will be used as start InputAdornment - */
  startAdornment?: ReactNode
  /** Custom input component */
  inputComponent?: ComponentType<InputProps>
  /** Callback responsible for rendering the option given the option and its index in the list of options */
  renderOption?: (option: Item, index?: number) => ReactNode
}

const isMatchingMinLength = (value: string, minLength?: number) =>
  !minLength || value.length >= minLength

const getItemText = (item: Maybe<Item>) =>
  (item && item.text) || EMPTY_INPUT_VALUE

const getItemValue = (item: Maybe<Item>) =>
  (item && (item.value || item.text)) || null

const isSelected = (item: Item, selectedItem: Maybe<Item>) =>
  getItemValue(item) === getItemValue(selectedItem)

export const Autocomplete = forwardRef<HTMLInputElement, Props>(
  function Autocomplete(
    {
      classes,
      className,
      defaultInputValue,
      inputValue: inputValueProp,
      onChange: onInputChange,
      defaultValue,
      value,
      onSelect,
      loading,
      minLength,
      placeholder,
      noOptionsText,
      options,
      style,
      width,
      allowAny,
      onKeyDown,
      inputComponent,
      renderOption,
      ...rest
    },
    ref
  ) {
    const [
      selectedItemValue,
      setSelectedItemValue
    ] = useControlledAndUncontrolledState(defaultValue, value, onSelect!)

    const selectedItem =
      selectedItemValue === null
        ? null
        : options!.find(option => getItemValue(option) === selectedItemValue)

    const [inputValue, setInputValue] = useControlledAndUncontrolledInput(
      defaultInputValue || getItemText(selectedItem),
      inputValueProp,
      onInputChange!
    )

    if (selectedItem === undefined) {
      window.console.warn(
        `Autocomplete: There is no option for the given value \`${selectedItemValue}\``
      )
      return null
    }

    const handleInputValueChange = (newInputValue: string) => {
      if (newInputValue !== inputValue) {
        setInputValue(newInputValue)
      }
    }

    const handleSelectItem = (item: Item | null) => {
      setSelectedItemValue(getItemValue(item))
    }

    const matchingOptions =
      getItemText(selectedItem) === inputValue
        ? options!
        : options!.filter(item => isSubstring(inputValue, getItemText(item)))

    const currentSelectedItemIndex = selectedItem
      ? matchingOptions.indexOf(selectedItem)
      : null

    const downshiftStateReducer = (
      state: DownshiftState<Item>,
      changes: StateChangeOptions<Item>
    ): Partial<StateChangeOptions<Item>> => {
      switch (changes.type) {
        case Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem:
          return { ...changes, highlightedIndex: currentSelectedItemIndex }
        case Downshift.stateChangeTypes.changeInput:
          return { ...changes, highlightedIndex: FIRST_ITEM_INDEX }
        case Downshift.stateChangeTypes.mouseUp:
        case Downshift.stateChangeTypes.blurInput:
          const hasInput = inputValue.length > 0

          if (
            allowAny &&
            hasInput &&
            inputValue !== getItemText(selectedItem)
          ) {
            return {
              ...changes,
              inputValue,
              selectedItem: null
            }
          }
          break
      }
      return changes
    }

    const downshiftItemToString = (item: Item | null) =>
      item === null
        ? allowAny
          ? inputValue
          : EMPTY_INPUT_VALUE
        : getItemText(item)

    return (
      <Downshift
        inputValue={inputValue}
        onInputValueChange={handleInputValueChange}
        selectedItem={selectedItem}
        onChange={handleSelectItem}
        itemToString={downshiftItemToString}
        stateReducer={downshiftStateReducer}
      >
        {({
          getMenuProps,
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex,
          selectItem,
          setState
        }) => {
          const hasMatchingOptions = matchingOptions.length > 0
          const canOpen =
            isOpen && isMatchingMinLength(inputValue, minLength) && !loading

          const optionsMenu = (
            <ScrollMenu selectedIndex={highlightedIndex}>
              {hasMatchingOptions ? (
                matchingOptions.map((option, index) => (
                  <Menu.Item
                    key={getItemValue(option)}
                    selected={highlightedIndex === index}
                    disabled={isSelected(option, selectedItem)}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...getItemProps({ item: option, index })}
                  >
                    {renderOption
                      ? renderOption(option, index)
                      : getItemText(option)}
                  </Menu.Item>
                ))
              ) : (
                <Menu.Item disabled>{noOptionsText}</Menu.Item>
              )}
            </ScrollMenu>
          )

          const handleFocusOrClick = () => {
            if (!isOpen) {
              let newInputValue = inputValue
              const isInputSelectedItem =
                inputValue === getItemText(selectedItem)

              if (!allowAny || isInputSelectedItem) {
                newInputValue = EMPTY_INPUT_VALUE
              }
              setState({
                isOpen: true,
                inputValue: newInputValue,
                highlightedIndex: currentSelectedItemIndex || FIRST_ITEM_INDEX
              })
            }
          }

          const InputComponent = inputComponent || Input

          const inputProps = getInputProps({
            onFocus: handleFocusOrClick,
            onClick: handleFocusOrClick,
            onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
              if (
                event.key === 'Backspace' &&
                inputValue === EMPTY_INPUT_VALUE
              ) {
                selectItem(null)
              }
              onKeyDown!(event, inputValue)
            }
          })

          return (
            <div
              className={cx(
                classes.root,
                className,
                classes[`root${capitalize(width!)}`]
              )}
              style={style}
            >
              <InputComponent
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...rest}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...inputProps}
                defaultValue={inputProps.defaultValue as string | undefined}
                value={inputProps.value as string | undefined}
                onChange={e => {
                  inputProps.onChange!(e as FormEvent<HTMLInputElement>)
                }}
                ref={ref}
                classes={{}}
                placeholder={
                  selectedItem ? getItemText(selectedItem) : placeholder
                }
                icon={loading ? <Loader size='small' /> : null}
                iconPosition='end'
                width={width}
              />
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <div {...getMenuProps()}>{canOpen ? optionsMenu : null}</div>
            </div>
          )
        }}
      </Downshift>
    )
  }
)

Autocomplete.defaultProps = {
  allowAny: true,
  defaultInputValue: '',
  defaultValue: null,
  loading: false,
  minLength: 0,
  noOptionsText: 'No options',
  onChange: () => {},
  onKeyDown: () => {},
  onSelect: () => {},
  options: [],
  width: 'auto'
}

Autocomplete.displayName = 'Autocomplete'

export default withStyles(styles)(Autocomplete)

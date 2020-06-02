import React, {
  KeyboardEvent,
  forwardRef,
  ComponentType,
  InputHTMLAttributes,
  ReactNode,
  FocusEventHandler
} from 'react'
import { makeStyles } from '@material-ui/styles'
import { BaseProps } from '@toptal/picasso-shared'

import Label from '../Label'
import Autocomplete, { Item as AutocompleteItem } from '../Autocomplete'
import TagSelectorInput from '../TagSelectorInput'
import { Props as InputProps } from '../Input'
import styles from './styles'

export interface Item extends AutocompleteItem {
  value?: string
}

const useStyles = makeStyles(styles)

const EMPTY_INPUT_VALUE = ''

const isIncluded = (items: Item[], currentItem: Item) =>
  items.some(item => item === currentItem)

const getItemText = (item: Item | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE

export interface Props
  extends BaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Placeholder for value */
  placeholder?: string
  /** Disables `TagSelector` */
  disabled?: boolean
  /** Indicate whether `Input` is in error state */
  error?: boolean
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Text prefix for other option */
  otherOptionLabel?: string
  /**  Callback invoked when other option selected */
  onOtherOptionSelect?: (value: string) => void
  /** Allow to show the other option in the list of options */
  showOtherOption?: boolean
  /** List of options with unique labels */
  options?: Item[] | null
  /** The list of values of the selected options, required for a controlled component. */
  value?: Item[]
  /** A function that takes a display value from the option item */
  getDisplayValue?: (item: Item | null) => string
  /**  Callback invoked when selection changes */
  onChange?: (value: Item[]) => void
  /** The value of the `input` element, required for a controlled component. */
  inputValue?: string
  /**  Callback invoked when `input` element value is changed */
  onInputChange?: (inputValue: string) => void
  /** Focus event handler */
  onFocus?: FocusEventHandler<HTMLInputElement>
  /** Blur event handler */
  onBlur?: FocusEventHandler<HTMLInputElement>
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Specifies whether the autofill enabled or not, disabled by default */
  enableAutofill?: boolean
  /** Provide unique key for each option */
  getKey?: (item: Item) => string
  /** Callback responsible for rendering the option given the option and its index in the list of options */
  renderOption?: (option: Item, index: number) => ReactNode
}

export const TagSelector = forwardRef<HTMLInputElement, Props>(
  function TagSelector(props, ref) {
    const {
      loading,
      disabled,
      placeholder,
      options = [],
      otherOptionLabel,
      onOtherOptionSelect,
      showOtherOption,
      value: values = [],
      getDisplayValue,
      onChange,
      inputValue = '',
      onInputChange,
      onFocus,
      onBlur,
      width,
      enableAutofill,
      getKey: customGetKey,
      renderOption,
      ...rest
    } = props

    const classes = useStyles(props)

    const handleDelete = (value: Item) => {
      if (disabled) return

      const index = values.indexOf(value)

      onChange!([...values.slice(0, index), ...values.slice(index + 1)])
    }

    const handleKeyDown = (
      event: KeyboardEvent<HTMLInputElement>,
      newInputValue: string
    ) => {
      const hasSelection = values.length
      const isDeleting = event.key === 'Backspace'

      if (hasSelection && !newInputValue && isDeleting) {
        handleDelete(values[values.length - 1])
      }
    }

    const handleSelect = (autocompleteItem: AutocompleteItem) => {
      const item = autocompleteItem as Item

      onChange!([...values, item])
      onInputChange!('')
    }

    const handleOtherOptionSelect = (value: string) => {
      onInputChange!('')
      onOtherOptionSelect!(value)
    }

    const getKey = (item: Item): string => {
      if (customGetKey) {
        return customGetKey(item)
      }

      if (item.value !== undefined) {
        return item.value
      }

      console.error(
        'TagSelector expects you to provide key prop value with getKey or Item.value!'
      )

      return ''
    }

    const autocompleteOptions: AutocompleteItem[] | null =
      options && options.filter(option => !isIncluded(values, option))

    const labels = (
      <>
        {values.map(item => (
          <Label
            className={classes.label}
            key={getKey!(item)}
            disabled={disabled}
            onDelete={() => handleDelete(item)}
          >
            {getDisplayValue!(item)}
          </Label>
        ))}
      </>
    )

    return (
      <Autocomplete
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        placeholder={values.length === 0 ? placeholder : undefined}
        options={autocompleteOptions}
        value={inputValue}
        onSelect={handleSelect}
        onOtherOptionSelect={handleOtherOptionSelect}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        startAdornment={labels}
        loading={loading}
        disabled={disabled}
        inputComponent={TagSelectorInput as ComponentType<InputProps>}
        width={width}
        showOtherOption={showOtherOption}
        otherOptionText={otherOptionLabel}
        enableAutofill={enableAutofill}
        getDisplayValue={getDisplayValue}
        renderOption={renderOption}
        enableReset={false}
        getKey={getKey}
      />
    )
  }
)

TagSelector.defaultProps = {
  enableAutofill: false,
  getDisplayValue: getItemText,
  loading: false,
  onChange: () => {},
  onInputChange: () => {},
  onOtherOptionSelect: () => {},
  options: [],
  otherOptionLabel: 'Add new option: ',
  placeholder: '',
  showOtherOption: false
}

TagSelector.displayName = 'TagSelector'

export default TagSelector

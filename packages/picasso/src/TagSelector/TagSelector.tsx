import type {
  KeyboardEvent,
  ComponentType,
  InputHTMLAttributes,
  ReactNode,
  FocusEventHandler,
} from 'react'
import React, { forwardRef, Fragment } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { PopperOptions } from 'popper.js'

import type {
  AutocompleteProps,
  Item as AutocompleteItem,
} from '../Autocomplete'
import Autocomplete from '../Autocomplete'
import TagSelectorInput from '../TagSelectorInput'
import type { Props as InputProps } from '../Input'
import TagSelectorLabel from '../TagSelectorLabel'
import unsafeErrorLog from '../utils/unsafe-error-log'
import noop from '../utils/noop'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'
import type { Status } from '../OutlinedInput'

export interface Item extends AutocompleteItem {
  value?: string
  status?: 'error'
}

const EMPTY_INPUT_VALUE = ''

export const filterOutSelectedOptions = (
  options: Item[] | null,
  values: Item[],
  getKey = (item: Item) => item.value
): AutocompleteItem[] | null => {
  if (!options) {
    return null
  }

  const valuesKeySet = values.reduce(
    (acc, item) => acc.add(getKey(item) as string),
    new Set<string>()
  )

  return options.filter(option => !valuesKeySet.has(getKey(option) as string))
}

const getItemText = (item: Item | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE

export interface Props
  extends BaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Placeholder for value */
  placeholder?: string
  /** Disables `TagSelector` */
  disabled?: boolean
  /**
   * @deprecated Use the `status` prop instead to both support success and error states
   * Indicate whether `TagSelector` is in error state
   */
  error?: boolean
  /** Indicate `TagSelector` status */
  status?: Status
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Text prefix for other option */
  otherOptionLabel?: string
  /** Callback invoked when other option selected */
  onOtherOptionSelect?: (value: string) => void
  /** Allow to show the other option in the list of options */
  showOtherOption?: boolean
  /** Label to show when no options were found */
  noOptionsText?: string
  /** List of options with unique labels */
  options?: Item[] | null
  /** The list of values of the selected options, required for a controlled component. */
  value?: Item[]
  /** A function that takes a display value from the option item */
  getDisplayValue?: (item: Item | null) => string
  /**  Callback invoked when selection changes */
  onChange?: (value: Item[]) => void
  /** Whether to close popper upon selection */
  closeOnSelect?: boolean
  /** The value of the `input` element, required for a controlled component. */
  inputValue?: string
  /** Callback invoked when `input` element value is changed */
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
  /** Callback responsible for rendering the label given the option and Label props */
  renderLabel?: (props: {
    item: Item
    displayValue: string
    onDelete: () => void
    disabled?: boolean
  }) => ReactNode
  /** DOM element that wraps the Popper */
  popperContainer?: HTMLElement
  /** Options provided to the popper.js instance */
  popperOptions?: PopperOptions
  testIds?: AutocompleteProps['testIds']
  highlight?: 'autofill'
}

export const TagSelector = forwardRef<HTMLInputElement, Props>(
  function TagSelector(props, ref) {
    const {
      disabled,
      enableAutofill,
      getDisplayValue = getItemText,
      getKey: customGetKey,
      inputValue = '',
      loading,
      noOptionsText,
      onBlur,
      onChange = noop,
      onFocus,
      onInputChange = noop,
      onOtherOptionSelect = noop,
      options = [],
      otherOptionLabel,
      placeholder,
      renderLabel: customRenderLabel,
      renderOption,
      showOtherOption,
      value: values = [],
      width,
      popperContainer,
      popperOptions,
      error,
      status,
      testIds,
      highlight,
      ...rest
    } = props

    usePropDeprecationWarning({
      props,
      name: 'error',
      componentName: 'TagSelector',
      description:
        'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
    })

    const handleDelete = (value: Item) => {
      if (disabled) {
        return
      }

      const index = values.indexOf(value)

      onChange([...values.slice(0, index), ...values.slice(index + 1)])
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

      onChange([...values, item])
      onInputChange('')
    }

    const handleOtherOptionSelect = (value: string) => {
      onInputChange('')
      onOtherOptionSelect(value)
    }

    const getKey = (item: Item): string => {
      if (customGetKey) {
        return customGetKey(item)
      }

      if (item.value !== undefined) {
        return item.value
      }

      unsafeErrorLog(
        'TagSelector expects you to provide key prop value with getKey or Item.value!'
      )

      return ''
    }

    const autocompleteOptions: AutocompleteItem[] | null =
      filterOutSelectedOptions(options, values, getKey)

    const renderLabel = (item: Item) => {
      const displayValue = getDisplayValue(item)
      const handleItemDelete = () => handleDelete(item)
      const hasError = item.status === 'error'

      if (customRenderLabel) {
        return customRenderLabel({
          disabled,
          item,
          displayValue,
          onDelete: handleItemDelete,
        })
      }

      return (
        <TagSelectorLabel
          variant={hasError ? 'red' : undefined}
          disabled={disabled}
          onDelete={handleItemDelete}
        >
          {displayValue}
        </TagSelectorLabel>
      )
    }

    const renderTags = values.map(item => (
      <Fragment key={getKey(item)}>{renderLabel(item)}</Fragment>
    ))

    return (
      <Autocomplete
        {...rest}
        status={error ? 'error' : status}
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
        startAdornment={renderTags}
        loading={loading}
        disabled={disabled}
        inputComponent={TagSelectorInput as ComponentType<InputProps>}
        width={width}
        showOtherOption={showOtherOption}
        otherOptionText={otherOptionLabel}
        noOptionsText={noOptionsText}
        enableAutofill={enableAutofill}
        getDisplayValue={getDisplayValue}
        renderOption={renderOption}
        enableReset={false}
        getKey={getKey}
        popperContainer={popperContainer}
        popperOptions={popperOptions}
        testIds={testIds}
        highlight={highlight}
      />
    )
  }
)

TagSelector.defaultProps = {
  enableAutofill: false,
  getDisplayValue: getItemText,
  loading: false,
  onChange: noop,
  closeOnSelect: true,
  onInputChange: noop,
  onOtherOptionSelect: noop,
  options: [],
  otherOptionLabel: 'Add new option: ',
  noOptionsText: 'No matches found',
  placeholder: '',
  showOtherOption: false,
  status: 'default',
}

TagSelector.displayName = 'TagSelector'

export default TagSelector

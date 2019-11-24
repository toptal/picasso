import React, {
  KeyboardEvent,
  Fragment,
  forwardRef,
  useRef,
  ComponentType,
  InputHTMLAttributes,
  ReactNode
} from 'react'
import { withStyles } from '@material-ui/core/styles'

import { useCombinedRefs } from '../utils'
import { StandardProps } from '../Picasso'
import Label from '../Label'
import Autocomplete, { Item as AutocompleteItem } from '../Autocomplete'
import TagSelectorInput from '../TagSelectorInput'
import { Props as InputProps } from '../Input'
import styles from './styles'

export interface Item extends AutocompleteItem {
  value?: string
}

const EMPTY_INPUT_VALUE = ''

const isIncluded = (items: Item[], currentItem: Item) =>
  items.some(item => item === currentItem)

const getItemText = (item: Item | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE

export interface Props
  extends StandardProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Placeholder for value */
  placeholder?: string
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Text prefix for other option */
  otherOptionLabel?: string
  /**  Callback invoked when other option selected */
  onOtherOptionSelect?: (value: string) => void
  /** Allow to show the other option in the list of options */
  showOtherOption?: boolean
  /** List of options with unique labels */
  options?: Item[]
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
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Specifies whether the autofill enabled or not, disabled by default */
  enableAutofill?: boolean
  /** Provide unique key for each option */
  getKey?: (item: Item) => string | number
  /** Callback responsible for rendering the option given the option and its index in the list of options */
  renderOption?: (option: Item, index: number) => ReactNode
}

export const TagSelector = forwardRef<HTMLInputElement, Props>(
  function TagSelector(
    {
      loading,
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
      width,
      enableAutofill,
      getKey: customGetKey,
      renderOption,
      ...rest
    },
    ref
  ) {
    const inputRef = useCombinedRefs<HTMLInputElement>(
      ref,
      useRef<HTMLInputElement>(null)
    )

    React.useLayoutEffect(() => {
      const inputNode = inputRef.current

      if (inputNode) {
        const resizeInput = () => {
          const inputNodeLength = inputNode.value.length
          const isInputBlank = inputValue.length === 0
          const isNothingSelected = values.length === 0
          const isShowingPlaceholder = isInputBlank && isNothingSelected

          inputNode.style.width = isShowingPlaceholder
            ? 'auto'
            : `${inputNodeLength + 2}ch`
        }

        resizeInput()
        inputNode.addEventListener('input', resizeInput)
        return () => {
          inputNode.removeEventListener('input', resizeInput)
        }
      }
    }, [values])

    const handleDelete = (value: Item) => {
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

    const getKey = (item: Item) => {
      if (customGetKey) {
        return customGetKey(item)
      }

      if (item.value) {
        return item.value
      }

      console.error(
        'TagSelector expects you to provide key prop value with getKey or Item.value!'
      )
    }

    const autocompleteOptions: AutocompleteItem[] = options.filter(
      option => !isIncluded(values, option)
    )

    const labels = (
      <Fragment>
        {values.map(item => (
          <Label key={getKey!(item)} onDelete={() => handleDelete(item)}>
            {getDisplayValue!(item)}
          </Label>
        ))}
      </Fragment>
    )

    return (
      <Autocomplete
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={inputRef}
        placeholder={values.length === 0 ? placeholder : undefined}
        options={autocompleteOptions}
        value={inputValue}
        onSelect={handleSelect}
        onOtherOptionSelect={handleOtherOptionSelect}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        startAdornment={labels}
        loading={loading}
        inputComponent={TagSelectorInput as ComponentType<InputProps>}
        width={width}
        showOtherOption={showOtherOption}
        otherOptionText={otherOptionLabel}
        enableAutofill={enableAutofill}
        getDisplayValue={getDisplayValue}
        renderOption={renderOption}
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

export default withStyles(styles)(TagSelector)

import React, {
  KeyboardEvent,
  Fragment,
  forwardRef,
  useRef,
  ComponentType,
  InputHTMLAttributes
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
  value: string
  text: string
}

const isIncluded = (items: Item[], item: Item) =>
  items.some(({ value }) => value === item.value)

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
  onOtherOptionSelect?: (item: Item) => void
  /** Allow to show the other option in the list of options */
  showOtherOption?: boolean
  /** List of options with unique labels */
  options?: Item[]
  /** The list of values of the selected options, required for a controlled component. */
  value?: Item[]
  /** A function that takes a display value from the option item */
  getDisplayValue?: (item: AutocompleteItem | null) => string
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

      if (!isIncluded(values, item)) {
        onChange!([...values, item])
      }

      onInputChange!('')
    }

    const handleOtherOptionSelect = (item: AutocompleteItem) => {
      const itemText = getDisplayValue!(item)

      const newOption: Item = {
        value: itemText,
        text: itemText
      }

      onOtherOptionSelect!(newOption)

      if (!isIncluded(values, newOption)) {
        onChange!([...values, newOption])
      }

      onInputChange!('')
    }

    const autocompleteOptions: AutocompleteItem[] = options.filter(
      option => !isIncluded(values, option)
    )

    const labels = (
      <Fragment>
        {values.map(item => (
          <Label key={item.value} onDelete={() => handleDelete(item)}>
            {item.text}
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
      />
    )
  }
)

TagSelector.defaultProps = {
  enableAutofill: false,
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

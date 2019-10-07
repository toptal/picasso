import React, {
  KeyboardEvent,
  Fragment,
  forwardRef,
  useRef,
  ComponentType,
  InputHTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'

import { useCombinedRefs } from '../../utils'
import { StandardProps } from '../../Picasso'
import Label from '../../Label'
import Autocomplete from '../Autocomplete'
import styles from './styles'
import TagSelectorInput from '../TagSelectorInput'
import { Props as InputProps } from '../../Input'
import useControlledAndUncontrolledState from '../../utils/use-controlled-and-uncontrolled-state'
import useControlledAndUncontrolledInput from '../../utils/use-controlled-and-uncontrolled-input'

type Item = {
  value: string
  text: string
}

type SelectedValuesStateTuple = [string[], ((value: string[]) => void)]

export interface Props
  extends StandardProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Placeholder for value */
  placeholder?: string
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Text prefix for new option */
  newOptionLabel?: string
  /** List of options with unique labels */
  options?: Item[]
  /** The list of default selected option values. Use when the component is not controlled. */
  defaultValue?: string[]
  /** The list of values of the selected options, required for a controlled component. */
  value?: string[]
  /**  Callback invoked when selection changes */
  onChange?: (value: string[]) => void
  /** The default `input` element value. Use when the component is not controlled. */
  defaultInputValue?: string
  /** The value of the `input` element, required for a controlled component. */
  inputValue?: string
  /**  Callback invoked when `input` element value is changed */
  onInputChange?: (inputValue: string) => void
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
}

export const TagSelector = forwardRef<HTMLInputElement, Props>(
  function TagSelector(
    {
      loading,
      placeholder,
      options,
      newOptionLabel,
      defaultValue,
      value,
      onChange,
      defaultInputValue,
      inputValue: inputValueProp,
      onInputChange,
      width,
      ...rest
    },
    ref
  ) {
    const [inputValue, setInputValue] = useControlledAndUncontrolledInput(
      defaultInputValue,
      inputValueProp,
      onInputChange!
    )

    const [
      selectedValues,
      setSelectedValues
    ] = useControlledAndUncontrolledState(defaultValue, value, onChange as (
      value: string[] | null
    ) => void) as SelectedValuesStateTuple
    const [addedOptions, setAddedOptions] = React.useState<Item[]>([])
    const currentOptions = [...options!, ...addedOptions]

    const inputRef = useCombinedRefs<HTMLInputElement>(
      ref,
      useRef<HTMLInputElement>(null)
    )

    React.useLayoutEffect(() => {
      const inputNode = inputRef.current

      if (inputNode) {
        const resizeInput = () => {
          const inputLength = inputNode.value.length
          const isInputBlank = inputLength === 0
          const isNothingSelected = selectedValues.length === 0
          const isShowingPlaceholder = isInputBlank && isNothingSelected

          inputNode.style.width = isShowingPlaceholder
            ? 'auto'
            : `${inputLength + 2}ch`
        }

        resizeInput()
        inputNode.addEventListener('input', resizeInput)
        return () => {
          inputNode.removeEventListener('input', resizeInput)
        }
      }
    }, [selectedValues])

    const handleDelete = (value: string) => {
      const index = selectedValues.indexOf(value)

      setSelectedValues([
        ...selectedValues.slice(0, index),
        ...selectedValues.slice(index + 1)
      ])
    }

    const handleKeyDown = (
      event: KeyboardEvent<HTMLInputElement>,
      inputValue: string
    ) => {
      const hasSelection = selectedValues.length
      const hasValue = inputValue
      const isDeleting = event.key === 'Backspace'

      if (hasSelection && !hasValue && isDeleting) {
        handleDelete(selectedValues[selectedValues.length - 1])
      }
    }

    const handleSelect = (itemValue: string | null) => {
      if (!itemValue) return

      if (!selectedValues.includes(itemValue)) {
        setSelectedValues([...selectedValues, itemValue])
      }
      setInputValue('')
    }

    const handleOtherOptionSelect = (itemText: string) => {
      setAddedOptions([
        ...addedOptions,
        {
          value: itemText,
          text: itemText
        }
      ])

      if (!selectedValues.includes(itemText)) {
        setSelectedValues([...selectedValues, itemText])
      }
      setInputValue('')
    }

    const autocompleteOptions: Item[] = currentOptions.filter(
      item => !selectedValues.includes(item.value)
    )

    const labels = (
      <Fragment>
        {selectedValues.map(value => {
          const item = currentOptions.find(option => option.value === value)

          if (!item) {
            window.console.warn(
              `TagSelector: There is no option for the given value \`${value}\``
            )
            return null
          }
          return (
            <Label key={value} onDelete={() => handleDelete(value)}>
              {item.text}
            </Label>
          )
        })}
      </Fragment>
    )

    return (
      <Autocomplete
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={inputRef}
        placeholder={selectedValues.length === 0 ? placeholder : undefined}
        options={autocompleteOptions}
        value={null}
        onSelect={handleSelect}
        onOtherOptionSelect={handleOtherOptionSelect}
        inputValue={inputValue}
        onChange={setInputValue}
        onKeyDown={handleKeyDown}
        startAdornment={labels}
        loading={loading}
        inputComponent={TagSelectorInput as ComponentType<InputProps>}
        width={width}
        showOtherOption
        otherOptionText={newOptionLabel}
      />
    )
  }
)

TagSelector.defaultProps = {
  defaultValue: [],
  loading: false,
  newOptionLabel: 'Add new option: ',
  onChange: () => {},
  onInputChange: () => {},
  options: [],
  placeholder: ''
}

TagSelector.displayName = 'TagSelector'

export default withStyles(styles)(TagSelector)

import React, {
  KeyboardEvent,
  ChangeEvent,
  Fragment,
  forwardRef,
  useRef,
  Ref
} from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Maybe, useCombinedRefs } from '../../utils'
import { StandardProps } from '../../Picasso'
import Label from '../../Label'
import { Props as InputProps } from '../../Input'
import OutlinedInput from '../../OutlinedInput'
import Autocomplete, { Item as AutoCompleteItem } from '../../Autocomplete'
import styles from './styles'
import Loader from '../../Loader'
import InputAdornment from '../../InputAdornment'

type Item = {
  value: string
  text: string
}

const getUniqueValue = (value: string) =>
  `${value.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`

export interface Props extends StandardProps {
  /** Placeholder for value */
  placeholder?: string
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Text prefix for new option */
  newOptionLabel?: string
  /** List of options with unique labels */
  options?: Item[]
  /** List of pre-selected items values */
  defaultValues?: string[]
  /**  Callback invoked when item is selected */
  onChange?: (selectedValues: string[]) => void
  /**  Callback invoked when typing value is changed */
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TagSelector = forwardRef<HTMLInputElement, Props>(
  function TagSelector(
    {
      classes,
      loading,
      placeholder,
      options,
      defaultValues,
      newOptionLabel,
      onChange,
      onInputChange
    },
    ref
  ) {
    const [inputValue, setInputValue] = React.useState<string | null>(null)
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      defaultValues!
    )
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

    const handleInputChange = React.useCallback((
      e: ChangeEvent<HTMLInputElement>
    ) => {
      setInputValue((e.target.value || '').trim())
      onInputChange!(e)
    }, [onInputChange])

    const updateSelectedValues = (values: string[]) => {
      setSelectedValues(values)
      onChange!(values)
    }

    const handleDelete = (value: string) => {
      const index = selectedValues.indexOf(value)

      updateSelectedValues([
        ...selectedValues.slice(0, index),
        ...selectedValues.slice(index + 1)
      ])
    }

    const handleKeyDown = (
      event: KeyboardEvent<HTMLInputElement>,
      inputValue: string | null
    ) => {
      const hasSelection = selectedValues.length
      const hasValue = inputValue
      const isDeleting = event.key === 'Backspace'

      if (hasSelection && !hasValue && isDeleting) {
        handleDelete(selectedValues[selectedValues.length - 1])
      }
    }

    const handleSelect = (
      item: Maybe<AutoCompleteItem>,
      { resetInput }: { resetInput: () => void }
    ) => {
      if (!item || !item.value) return

      const isInOptions = currentOptions.find(
        option => option.value === item.value
      )

      if (!isInOptions) {
        setAddedOptions([
          ...addedOptions,
          { value: item.value, text: inputValue || '' }
        ])
      }

      if (!selectedValues.includes(item.value)) {
        updateSelectedValues([...selectedValues, item.value])
      }
      setInputValue(null)
      resetInput()
    }

    const nonSelectedOptions: Item[] = currentOptions.filter(
      item => !selectedValues.includes(item.value)
    )

    const maybeNewOptions = inputValue
      ? [
          {
            value: getUniqueValue(inputValue),
            text: `${newOptionLabel}${inputValue}`
          }
        ]
      : []

    const autocompleteOptions: Item[] = [
      ...nonSelectedOptions,
      ...maybeNewOptions
    ]

    const labels = (
      <Fragment>
        {selectedValues.map(value => {
          const item = currentOptions.find(option => option.value === value)

          if (!item) {
            window.console.warn(
              `TagSelector: There is no option for the given value \` ${value}\``
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

    const loaderAdornment = loading ? (
      <InputAdornment position='end' className={classes.loaderAdornment}>
        {<Loader size='small' />}
      </InputAdornment>
    ) : null

    const renderTagSelectorInput = (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { iconPosition, ...outlinedInputProps }: InputProps,
      ref: Ref<HTMLInputElement>
    ) => (
      <OutlinedInput
        ref={ref}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...outlinedInputProps}
        startAdornment={labels}
        endAdornment={loaderAdornment}
        className={classes.inputBase}
      />
    )

    return (
      <Autocomplete
        ref={inputRef}
        placeholder={selectedValues.length === 0 ? placeholder : undefined}
        options={autocompleteOptions}
        onSelect={handleSelect}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        debounceTime={0}
        loading={loading}
        renderInput={renderTagSelectorInput}
      />
    )
  }
)

TagSelector.defaultProps = {
  defaultValues: [],
  loading: false,
  newOptionLabel: 'Add new option: ',
  onChange: () => {},
  onInputChange: () => {},
  options: [],
  placeholder: ''
}

TagSelector.displayName = 'TagSelector'

export default withStyles(styles)(TagSelector)

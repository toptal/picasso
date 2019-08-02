import React, { FunctionComponent, KeyboardEvent, ChangeEvent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Maybe } from '../utils'
import { StandardProps } from '../Picasso'
import Label from '../Label'
import LabelGroup from '../LabelGroup'
import Autocomplete from '../Autocomplete'
import styles from './styles'

type Item = {
  value: string
  label: string
}

type ReturnItem = {
  label?: string
  value?: string
  text?: string
}

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
  value?: string[]
  /**  Callback invoked when item is selected */
  onChange?: (selectedOptions: string[]) => void
  /**  Callback invoked when typing value is changed */
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TagSelector: FunctionComponent<Props> = ({
  loading = false,
  placeholder = '',
  options = [],
  value = [],
  newOptionLabel = 'Add new option: ',
  onChange = () => {},
  onInputChange = () => {},
  classes
}) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(value)
  const [availableOptions, setAvailableOptions] = React.useState<Item[]>(
    options
  )
  const [inputBoxValue, setInputBoxValue] = React.useState('')

  const updateValue = (value: string[]) => {
    setSelectedItems(value)
    onChange(value)
  }

  const getUniqueValue = (value: string) =>
    `${value.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputBoxValue((e.target.value || '').trim())
    onInputChange(e)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => {
    const hasSelection = selectedItems.length
    const hasValue = inputValue && inputValue.length
    const isDeleting = event.key === 'Backspace'

    if (hasSelection && !hasValue && isDeleting) {
      handleDelete(selectedItems[selectedItems.length - 1])
    }
  }

  const handleSelect = (
    item: Maybe<ReturnItem>,
    helpers: { resetInput: () => void }
  ) => {
    if (!item || !item.value) return null

    const isAtOptions = availableOptions.find(
      option => option.value === item!.value
    )

    let selectedItemsClone = [...selectedItems]

    if (!selectedItemsClone.includes(item.value)) {
      selectedItemsClone = [...selectedItemsClone, item.value]
    }

    if (!isAtOptions) {
      const newAvailableOptions = [
        ...availableOptions,
        { value: item.value, label: inputBoxValue }
      ]

      setAvailableOptions(newAvailableOptions)
    }

    updateValue(selectedItemsClone)
    setInputBoxValue('')
    helpers.resetInput()
  }

  const handleDelete = (itemValue: string) => {
    const index = selectedItems.indexOf(itemValue)
    const selectedItemsClone = [
      ...selectedItems.slice(0, index),
      ...selectedItems.slice(index + 1)
    ]

    updateValue(selectedItemsClone)
  }

  const filteredOptions = availableOptions!.filter(
    item => !selectedItems.includes(item.value)
  )

  if (inputBoxValue.length) {
    filteredOptions.push({
      value: getUniqueValue(inputBoxValue),
      label: `${newOptionLabel}${inputBoxValue}`
    })
  }

  const labels = (
    <LabelGroup>
      {availableOptions
        .filter(x => selectedItems.includes(x.value))
        .map(item => (
          <Label key={item.value} onDelete={() => handleDelete(item.value)}>
            {item.label}
          </Label>
        ))}
    </LabelGroup>
  )

  return (
    <Autocomplete
      placeholder={placeholder}
      options={filteredOptions}
      onSelect={handleSelect}
      onKeyDown={handleKeyDown}
      startAdornment={labels}
      onChange={handleInputChange}
      debounceTime={0}
      className={classes.autocompleteWrapper}
      loading={loading}
    />
  )
}

TagSelector.displayName = 'TagSelector'

export default withStyles(styles)(TagSelector)

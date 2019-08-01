import React, { FunctionComponent, KeyboardEvent, ChangeEvent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Actions } from 'downshift'

import { StandardProps } from '../Picasso'
import Label from '../Label'
import Autocomplete from '../Autocomplete'
import styles from './styles'

type Item = {
  value: string
  label: string
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
  value?: []
  /**  Callback invoked when item is selected */
  onChange?: (selectedOptions: string[]) => void
  /**  Callback invoked when typing value is changed */
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TagSelector: FunctionComponent<Props> = ({
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
    const hasValue = inputValue.length
    const isDeleting = event.key === 'Backspace'

    if (hasSelection && !hasValue && isDeleting) {
      handleDelete(selectedItems[selectedItems.length - 1])
    }
  }

  const handleSelect = (item: string, stateAndHelpers: Actions<string>) => {
    if (!item) return null
    let itemValue
    const selection = availableOptions.find(option => option.label === item)

    if (!selection) {
      const uniqueValue = getUniqueValue(inputBoxValue)

      itemValue = uniqueValue
      const newAvailableOptions = [
        ...availableOptions,
        { value: uniqueValue, label: inputBoxValue }
      ]

      setAvailableOptions(newAvailableOptions)
      setInputBoxValue('')
    } else {
      itemValue = selection!.value
    }

    let selectedItemsClone = [...selectedItems]

    if (!selectedItemsClone.includes(itemValue)) {
      selectedItemsClone = [...selectedItemsClone, itemValue]
    }

    updateValue(selectedItemsClone)
    stateAndHelpers.clearSelection()
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
      value: '',
      label: `${newOptionLabel}${inputBoxValue}`
    })
  }

  const labels = availableOptions
    .filter(x => selectedItems.includes(x.value))
    .map(item => (
      <Label
        className={classes.tag}
        key={item.value}
        onDelete={() => handleDelete(item.value)}
      >
        {item.label}
      </Label>
    ))

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
    />
  )
}

TagSelector.displayName = 'TagSelector'

export default withStyles(styles)(TagSelector)

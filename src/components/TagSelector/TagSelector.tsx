import React, { FunctionComponent, KeyboardEvent } from 'react'
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
  /** List of options with unique labels */
  options?: Item[]
  /** List of pre-selected items values */
  preselectedItems?: []
  /**  Callback invoked when item is selected */
  onChange?: (selectedOptions: string[]) => void
  /**  Text of custom action option */
  actionText?: string
  /**  Callback invoked when custom action is selected */
  onAdd?: (inputValue?: string) => void
}

export const TagSelector: FunctionComponent<Props> = ({
  actionText,
  placeholder = '',
  options = [],
  preselectedItems = [],
  onChange = () => {},
  onAdd = () => {}
}) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(
    preselectedItems
  )

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => {
    if (
      selectedItems.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      handleDelete(selectedItems[selectedItems.length - 1])
    }
  }

  const handleSelect = (item: string, stateAndHelpers: Actions<string>) => {
    if (!item) return null
    const selection = options.find(x => x.label === item)
    if (!selection) {
      onAdd(item)
      stateAndHelpers.clearSelection()
      return null
    }
    const itemValue = selection!.value
    let selectedItemsClone = [...selectedItems]

    if (!selectedItemsClone.includes(itemValue)) {
      selectedItemsClone = [...selectedItemsClone, itemValue]
    }

    setSelectedItems(selectedItemsClone)
    onChange(selectedItemsClone)
    stateAndHelpers.clearSelection()
  }

  const handleDelete = (itemValue: string) => {
    const index = selectedItems.indexOf(itemValue)
    const selectedItemsClone = [
      ...selectedItems.slice(0, index),
      ...selectedItems.slice(index + 1)
    ]

    setSelectedItems(selectedItemsClone)
    onChange(selectedItemsClone)
  }

  const filteredOptions = options!.filter(
    item => !selectedItems.includes(item.value)
  )

  const labels = options
    .filter(x => selectedItems.includes(x.value))
    .map(item => (
      <Label key={item.value} onDelete={() => handleDelete(item.value)}>
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
      actionText={actionText}
      onAdd={onAdd}
    />
  )
}

TagSelector.displayName = 'TagSelector'

export default withStyles(styles)(TagSelector)

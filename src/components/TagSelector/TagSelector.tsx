import React, {
  FunctionComponent,
  KeyboardEvent,
  ChangeEvent,
  ReactNode
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Downshift from 'downshift'
import { deburr } from 'lodash'
import { StandardProps } from '../Picasso'
import { isSubstring } from '../utils'

import Label from '../Label'
import Loader from '../Loader'
import Menu from '../Menu'
import ScrollMenu from '../ScrollMenu'
import TextField from '../TextField'

import styles from './styles'

type Item = {
  value: string
  label: string
}

type ActionProps = {
  inputValue: string
  selectedItems: string[]
}

export interface Props extends StandardProps {
  /** Placeholder for value */
  placeholder?: string
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** List of options */
  options?: Item[]
  /** List of pre-selected tag values */
  selectedTags?: []
  /**  Callback invoked when item is selected */
  onAdd?: (itemValue: string, selectedOptions: string[]) => void
  /**  Callback invoked when item is removed */
  onRemove?: (itemValue: string, selectedOptions: string[]) => void
  /**  Action component */
  action?: ({  }: ActionProps) => void
}

export const TagSelector: FunctionComponent<Props> = ({
  placeholder = '',
  loading = false,
  options = [],
  selectedTags = [],
  onAdd = () => {},
  onRemove = () => {},
  action = () => {}
}) => {
  const [inputValue, setInputValue] = React.useState('' as string)
  const [selectedItems, setSelectedItems] = React.useState<string[]>([
    ...selectedTags
  ])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      selectedItems.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      handleDelete(selectedItems[selectedItems.length - 1])
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleChange = (itemValue: string) => {
    if (!itemValue) return null
    let selectedItemsClone = [...selectedItems]
    if (selectedItemsClone.indexOf(itemValue) === -1) {
      selectedItemsClone = [...selectedItemsClone, itemValue]
    }
    setInputValue('')
    setSelectedItems(selectedItemsClone)
    onAdd(itemValue, selectedItemsClone)
  }

  const handleDelete = (itemValue: string) => {
    const selectedItemsClone = [...selectedItems]
    selectedItemsClone.splice(selectedItemsClone.indexOf(itemValue), 1)
    setSelectedItems(selectedItemsClone)
    onRemove(itemValue, selectedItemsClone)
  }

  return (
    <Downshift
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItems}
    >
      {({
        getInputProps,
        getMenuProps,
        getItemProps,
        isOpen,
        openMenu,
        highlightedIndex
      }) => {
        const {
          onBlur,
          onChange,
          onFocus,
          onKeyDown,
          autoComplete,
          ...inputProps
        } = getInputProps({
          labelWidth: 0,
          onKeyDown: handleKeyDown,
          onFocus: openMenu
        })

        const trimmedValue = (inputValue || '').trim()
        const filteredOptions = options.filter(({ label }) =>
          isSubstring(deburr(trimmedValue).toLowerCase(), label)
        )

        const isTyping = Boolean(trimmedValue)
        const hasOptions = Boolean(filteredOptions.length)

        const canOpen = isOpen && !loading && (hasOptions || isTyping)

        return (
          <div>
            <TextField
              placeholder={placeholder}
              autoComplete={autoComplete}
              value={inputValue}
              startAdornment={options
                .filter(x => selectedItems.includes(x.value))
                .map(item => (
                  <Label
                    key={item.value}
                    onDelete={() => handleDelete(item.value)}
                  >
                    {item.label}
                  </Label>
                ))}
              onBlur={onBlur}
              onFocus={onFocus}
              onKeyDown={onKeyDown}
              onChange={(event: any) => {
                handleInputChange(event)
                onChange!(event)
              }}
              inputProps={inputProps}
              icon={loading ? <Loader size='small' /> : null}
              iconPosition='end'
            />
            <div {...getMenuProps()}>
              {canOpen ? (
                <ScrollMenu selectedIndex={highlightedIndex}>
                  {filteredOptions.map((option, index) => (
                    <Menu.Item
                      key={option.value}
                      selected={
                        highlightedIndex === index ||
                        (selectedItems || '').indexOf(option.value) > -1
                      }
                      {...getItemProps({ item: option.value })}
                    >
                      {option.label}
                    </Menu.Item>
                  ))}
                  {action && action({ inputValue, selectedItems })}
                </ScrollMenu>
              ) : null}
            </div>
          </div>
        )
      }}
    </Downshift>
  )
}

TagSelector.displayName = 'TagSelector'

export default withStyles(styles)(TagSelector)

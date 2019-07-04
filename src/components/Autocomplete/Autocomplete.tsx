import React, {
  FunctionComponent,
  ChangeEvent,
  InputHTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import Downshift from 'downshift'
import debounce from 'debounce'

import { StandardProps } from '../Picasso'
import TextField from '../TextField'
import Menu from '../Menu'
import Loader from '../Loader'
import ScrollMenu from '../ScrollMenu'
import styles from './styles'

type Item = {
  label: string
}

type Value = string | null

/**
 * Alias for all valid HTML props for `<input>` element.
 * Does not include React's `ref` or `key`.
 */
type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>

export interface Props
  extends StandardProps,
    Omit<HTMLInputProps, 'onChange' | 'onSelect'> {
  /** Placeholder for value */
  placeholder?: string
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Shows the loading icon when suggestions are loading */
  loading?: boolean
  /** List of suggestions */
  suggestions?: {
    label: string
  }[] // original type: Item[]
  /**  Callback invoked when item is selected */
  onSelect?: (item: Item | null) => void
  /**  Callback invoked when typing value is changed */
  onChange?: (value: string) => void
}

const isSubstring = (value: Value, result: Item) => {
  if (!result) {
    return false
  }

  const inputValue = (value || '').trim().toLowerCase()

  return result.label.toLowerCase().includes(inputValue)
}

const getFilteredSuggestions = (suggestions: Item[], value: Value) =>
  suggestions.filter(suggestion => isSubstring(value, suggestion))

const getRelevantSuggestions = (
  suggestions: Item[],
  value: Value
): Item | null => {
  if (!value || !value.trim().length) {
    return null
  }

  const filteredSuggestions = getFilteredSuggestions(suggestions, value) || []

  if (isSubstring(value, filteredSuggestions[0])) {
    return filteredSuggestions[0]
  }

  return null
}

export const Autocomplete: FunctionComponent<Props> = ({
  classes,
  className,
  fullWidth = false,
  loading = false,
  placeholder,
  suggestions = [],
  style,
  onSelect = () => {},
  onChange = () => {},
  ...rest
}) => {
  const onChangeDebounced = debounce(onChange, 300)

  return (
    <Downshift onSelect={onSelect}>
      {({
        clearSelection,
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        inputValue,
        isOpen,
        openMenu,
        selectItem
      }) => {
        const filteredSuggestions = getFilteredSuggestions(
          suggestions,
          inputValue
        )

        const inputProps = getInputProps({
          onFocus: openMenu,
          onBlur: () => {
            const suggestion = getRelevantSuggestions(suggestions, inputValue)

            if (suggestion) {
              selectItem(suggestion.label)
            }
          },
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === '') {
              clearSelection()
            }

            onChangeDebounced(event.target.value)
          },
          placeholder
        })

        const renderSuggestions = (suggestions: Item[], inputValue: Value) => {
          if (!suggestions.length) {
            return inputValue !== '' ? (
              <Menu.Item disabled>No options</Menu.Item>
            ) : null
          }

          return suggestions.map((suggestion, index) => (
            <Menu.Item
              key={suggestion.label}
              selected={highlightedIndex === index}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getItemProps({ item: suggestion.label })}
            >
              {suggestion.label}
            </Menu.Item>
          ))
        }

        return (
          <div
            className={cx(classes.root, classes.rootFixedWidth, className, {
              [classes.rootFullWidth]: fullWidth
            })}
            style={style}
          >
            <TextField
              inputProps={{
                labelWidth: 0,
                ...inputProps,
                ...rest
              }}
              fullWidth={fullWidth}
              icon={loading ? <Loader size='small' /> : null}
              iconPosition='end'
            />

            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <div {...getMenuProps()}>
              {isOpen ? (
                <ScrollMenu selectedIndex={highlightedIndex}>
                  {renderSuggestions(filteredSuggestions, inputValue)}
                </ScrollMenu>
              ) : null}
            </div>
          </div>
        )
      }}
    </Downshift>
  )
}

Autocomplete.displayName = 'Autocomplete'

export default withStyles(styles)(Autocomplete)

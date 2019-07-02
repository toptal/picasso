import React, {
  FunctionComponent,
  FormEvent,
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
import MenuItem from '../MenuItem'
import Loader from '../Loader'
import styles from './styles'

type Item = {
  label: string
}

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

const isSubstring = (value: string | null, result: Item) => {
  const inputValue = (value || '').trim().toLowerCase()
  return result.label.toLowerCase().includes(inputValue)
}

const getFilteredSuggestions = (suggestions: Item[], value: string | null) =>
  suggestions.filter(suggestion => isSubstring(value, suggestion))

const getMostRelevantSuggestion = (
  suggestions: Item[],
  value: string | null
): Item | null => {
  if (!value || !value.trim().length) {
    return null
  }

  const filteredSuggestions = getFilteredSuggestions(suggestions, value)
  if (
    filteredSuggestions &&
    filteredSuggestions.length &&
    isSubstring(value, filteredSuggestions[0])
  ) {
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
        const inputProps = getInputProps({
          onFocus: openMenu,
          onBlur: () => {
            const suggestion = getMostRelevantSuggestion(
              suggestions,
              inputValue
            )
            if (suggestion) {
              selectItem(suggestion.label)
            }
          },
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === '') {
              clearSelection()
            }

            onChangeDebounced(e.target.value)
          },
          placeholder
        })

        const filteredSuggestions = getFilteredSuggestions(
          suggestions,
          inputValue
        )

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
              onChange={e => {
                if (!e) {
                  return
                }

                inputProps.onChange(e as FormEvent<HTMLInputElement>)
              }}
              value={inputProps.value as string}
              fullWidth={fullWidth}
              icon={loading ? <Loader size='small' /> : null}
              iconPosition='end'
            />

            <div {...getMenuProps()}>
              {isOpen ? (
                <Menu className={classes.menu}>
                  {filteredSuggestions.length ? (
                    filteredSuggestions.map((suggestion, index) => (
                      <MenuItem
                        key={suggestion.label}
                        selected={highlightedIndex === index}
                        component='div'
                        {...getItemProps({ item: suggestion.label })}
                      >
                        {suggestion.label}
                      </MenuItem>
                    ))
                  ) : inputValue !== '' ? (
                    <MenuItem disabled>No options</MenuItem>
                  ) : null}
                </Menu>
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

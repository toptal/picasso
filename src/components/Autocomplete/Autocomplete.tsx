import React, {
  FunctionComponent,
  ChangeEvent,
  InputHTMLAttributes,
  FormEvent
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'
import cx from 'classnames'
import Downshift from 'downshift'
import debounce from 'debounce'

import { StandardProps } from '../Picasso'
import TextField from '../TextField'
import Menu from '../Menu'
import Loader from '../Loader'
import ScrollMenu from '../ScrollMenu'
import isSubstring from '../utils/isSubstring'
import styles from './styles'

const DEBOUNCE_TIME = 300

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
  /** Debounce time for onChange event handler */
  debounceTime?: number
  /** Width of the component which will apply `min-width` to the `input` */
  width?: 'full' | 'shrink' | 'auto'
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Label to show when no options were found */
  noOptionsLabel?: string
  /** List of options */
  options?: Item[]
  /** The minimum number of characters a user must type before a search is performed */
  minLength?: number
  /**  Callback invoked when item is selected */
  onSelect?: (item: Item | null) => void
  /**  Callback invoked when typing value is changed */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const getFilteredOptions = (
  options: Item[],
  value: Value,
  minLength?: number
) => {
  if (!isMatchingMinLength(value, minLength)) {
    return options
  }

  return options.filter(option => isSubstring(value, option.label))
}

const getRelevantOption = (options: Item[], value: Value): Item | null => {
  if (!value || !value.trim().length) {
    return null
  }

  const filteredOptions = getFilteredOptions(options, value)

  return (
    filteredOptions.find(option => isSubstring(value, option.label)) || null
  )
}

const isMatchingMinLength = (value: Value, minLength?: number) => {
  const inputValue = value || ''

  return !minLength || inputValue.length >= minLength
}

export const Autocomplete: FunctionComponent<Props> = ({
  classes,
  className,
  debounceTime,
  loading,
  minLength,
  placeholder,
  noOptionsLabel,
  options,
  style,
  width,
  onSelect,
  onChange,
  ...rest
}) => {
  const onChangeDebounced = debounce(onChange!, debounceTime)

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
        const filteredOptions = getFilteredOptions(options!, inputValue)

        const isTyping = Boolean(inputValue)
        const hasOptions = Boolean(filteredOptions.length)

        const canOpen =
          isOpen &&
          isMatchingMinLength(inputValue, minLength) &&
          !loading &&
          (hasOptions || isTyping)

        const optionsMenu = (
          <ScrollMenu selectedIndex={highlightedIndex}>
            {!hasOptions ? (
              <Menu.Item disabled>{noOptionsLabel}</Menu.Item>
            ) : (
              filteredOptions.map((option, index) => (
                <Menu.Item
                  key={option.label}
                  selected={highlightedIndex === index}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...getItemProps({ item: option.label })}
                >
                  {option.label}
                </Menu.Item>
              ))
            )}
          </ScrollMenu>
        )

        const {
          onBlur: handleBlur,
          onFocus: handleFocus,
          onKeyDown: handleKeyDown,
          onChange: handleChange,
          value
        } = getInputProps({
          onFocus: openMenu,
          onBlur: () => {
            const option = getRelevantOption(options!, inputValue)

            if (option) {
              selectItem(option.label)
            }
          },
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === '') {
              clearSelection()
            }

            if (isMatchingMinLength(event.target.value, minLength)) {
              event.persist()
              onChangeDebounced(event)
            }
          }
        })

        return (
          <div
            className={cx(
              classes.root,
              className,
              classes[`root${capitalize(width!)}`]
            )}
            style={style}
          >
            <TextField
              icon={loading ? <Loader size='small' /> : null}
              iconPosition='end'
              onChange={event => {
                handleChange(event as FormEvent<HTMLInputElement>)
              }}
              // @ts-ignore
              value={value}
              width={width}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}
            />

            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <div {...getMenuProps()}>{canOpen ? optionsMenu : null}</div>
          </div>
        )
      }}
    </Downshift>
  )
}

Autocomplete.defaultProps = {
  debounceTime: DEBOUNCE_TIME,
  loading: false,
  noOptionsLabel: 'No options',
  onChange: () => {},
  onSelect: () => {},
  options: [],
  width: 'auto'
}

Autocomplete.displayName = 'Autocomplete'

export default withStyles(styles)(Autocomplete)

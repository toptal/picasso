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
  /** Width of the component which will apply `min-width` to the `input` */
  width?: 'full' | 'shrink' | 'auto'
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** List of options */
  options?: {
    label: string
  }[] // original type: Item[]
  /** The minimum number of characters a user must type before a search is performed */
  minLength?: number
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

const getFilteredOptions = (
  options: Item[],
  value: Value,
  minLength?: number
) => {
  if (!isMatchingMinLengthCondition(value, minLength)) {
    return options
  }

  return options.filter(option => isSubstring(value, option))
}

const getRelevantOption = (options: Item[], value: Value): Item | null => {
  if (!value || !value.trim().length) {
    return null
  }

  const filteredOptions = getFilteredOptions(options, value) || []

  if (isSubstring(value, filteredOptions[0])) {
    return filteredOptions[0]
  }

  return null
}

const isMatchingMinLengthCondition = (value: Value, minLength?: number) =>
  !minLength || (minLength && value && value.length >= minLength)

export const Autocomplete: FunctionComponent<Props> = ({
  classes,
  className,
  loading,
  minLength,
  placeholder,
  options,
  style,
  width,
  onSelect,
  onChange,
  ...rest
}) => {
  const onChangeDebounced = debounce(onChange!, 300)

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

        const inputProps = getInputProps({
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

            if (isMatchingMinLengthCondition(event.target.value, minLength)) {
              onChangeDebounced(event.target.value)
            }
          },
          placeholder
        })

        const renderOptions = (options: Item[], inputValue: Value) => {
          if (!options.length) {
            return inputValue !== '' ? (
              <Menu.Item disabled>No options</Menu.Item>
            ) : null
          }

          return options.map((option, index) => (
            <Menu.Item
              key={option.label}
              selected={highlightedIndex === index}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getItemProps({ item: option.label })}
            >
              {option.label}
            </Menu.Item>
          ))
        }

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
                inputProps.onChange(event as FormEvent<HTMLInputElement>)
              }}
              // @ts-ignore
              value={inputProps.value}
              width={width}
              onBlur={inputProps.onBlur}
              onFocus={inputProps.onFocus}
              onKeyDown={inputProps.onKeyDown}
              placeholder={placeholder}
              {...rest}
            />

            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <div {...getMenuProps()}>
              {isOpen &&
              isMatchingMinLengthCondition(inputValue, minLength) &&
              !loading ? (
                <ScrollMenu selectedIndex={highlightedIndex}>
                  {renderOptions(filteredOptions, inputValue)}
                </ScrollMenu>
              ) : null}
            </div>
          </div>
        )
      }}
    </Downshift>
  )
}

Autocomplete.defaultProps = {
  loading: false,
  onChange: () => {},
  onSelect: () => {},
  options: [],
  width: 'auto'
}

Autocomplete.displayName = 'Autocomplete'

export default withStyles(styles)(Autocomplete)

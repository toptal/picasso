import React, {
  FunctionComponent,
  ChangeEvent,
  InputHTMLAttributes,
  FormEvent,
  useState,
  useEffect,
  KeyboardEvent,
  ReactNode
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'
import cx from 'classnames'
import Downshift, {
  StateChangeOptions,
  ControllerStateAndHelpers,
  Actions
} from 'downshift'
import debounce from 'debounce'

import { StandardProps } from '../Picasso'
import Input from '../Input'
import Menu from '../Menu'
import Loader from '../Loader'
import ScrollMenu from '../ScrollMenu'
import { isSubstring, Maybe } from '../utils'
import styles from './styles'

const DEBOUNCE_TIME = 300
const EMPTY_VALUE = ''

type Item = {
  label?: string
  value?: string
  text?: string
}

/**
 * Alias for all valid HTML props for `<input>` element.
 * Does not include React's `ref` or `key`.
 */
type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>

export interface Props
  extends StandardProps,
    Omit<HTMLInputProps, 'onChange' | 'onSelect' | 'onKeyDown'> {
  /** Placeholder for value */
  placeholder?: string
  /** Debounce time for onChange event handler */
  debounceTime?: number
  /** Width of the component which will apply `min-width` to the `input` */
  width?: 'full' | 'shrink' | 'auto'
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Allow to input any value which is not in the list of `options` */
  allowAny?: boolean
  /** Label to show when no options were found */
  noOptionsText?: string
  /** List of options */
  options?: Item[]
  /** The minimum number of characters a user must type before a search is performed */
  minLength?: number
  /**  Callback invoked when item is selected */
  onSelect?: (item: Maybe<Item>, stateAndHelpers: Actions<string>) => void
  /**  Callback invoked when typing value is changed */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /**  Callback invoked when key is pressed */
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  /** ReactNode for labels that will be used as start InputAdornment - */
  startAdornment?: ReactNode
}

const isMatchingMinLength = (value: string, minLength?: number) =>
  !minLength || value.length >= minLength

const getItemLabel = (item: Maybe<Item>) => {
  if (!item) return EMPTY_VALUE

  return item.label || item.text || EMPTY_VALUE
}

const getItemValue = (item: Maybe<Item>) => {
  if (!item) return EMPTY_VALUE

  return item.value || getItemLabel(item)
}

export const Autocomplete: FunctionComponent<Props> = ({
  classes,
  className,
  debounceTime,
  loading,
  minLength,
  placeholder: initialPlaceholder,
  noOptionsText,
  options: initialOptions,
  style,
  width,
  allowAny,
  onSelect = () => {},
  value,
  onChange,
  onKeyDown,
  startAdornment,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string | null>(null)
  const [filter, setFilter] = useState(EMPTY_VALUE)
  const [placeholder, setPlaceholder] = useState(initialPlaceholder)
  const [selectedItem, setSelectedItem] = useState<Maybe<Item>>(null)
  const onChangeDebounced = debounce(onChange!, debounceTime)

  const selectItem = (item: Maybe<Item>) => {
    if (item === undefined) return

    setInputValue(getItemLabel(item))
    setSelectedItem(item)

    if (item !== null) {
      setPlaceholder(getItemLabel(item))
    } else {
      setPlaceholder(initialPlaceholder)
    }

    onSelect(item)
  }
  const handleStateChange = (props: StateChangeOptions<Item>) => {
    const { selectedItem } = props

    selectItem(selectedItem)
  }

  const options = initialOptions!.filter(item =>
    isSubstring(filter || EMPTY_VALUE, getItemLabel(item))
  )

  const isSelected = (item: Item, selectedItem: Item) =>
    getItemValue(item) === getItemValue(selectedItem)

  const handleChange = (
    item: Item,
    helpers: ControllerStateAndHelpers<Item>
  ) => {
    const { setHighlightedIndex } = helpers
    const currentIndex = options ? options.indexOf(item) : 0

    setHighlightedIndex(currentIndex)
  }

  useEffect(() => {
    const selectedItem = initialOptions!.find(
      option => getItemValue(option) === value
    )

    if (!selectedItem && allowAny && value !== undefined) {
      setInputValue(String(value))
    } else {
      selectItem(selectedItem)
    }
  }, [value])

  return (
    <Downshift
      itemToString={item => getItemLabel(item)}
      onStateChange={handleStateChange}
      onChange={handleChange}
      inputValue={inputValue}
      selectedItem={selectedItem}
    >
      {({
        getMenuProps,
        getInputProps,
        getItemProps,
        isOpen,
        selectedItem,
        highlightedIndex,
        openMenu,
        selectItem: downshiftSelectItem,
        setHighlightedIndex,
        reset
      }) => {
        const isTyping = Boolean(inputValue)
        const hasOptions = Boolean(options.length)
        const canOpen =
          isOpen &&
          isMatchingMinLength(inputValue || EMPTY_VALUE, minLength) &&
          !loading &&
          (hasOptions || isTyping)

        const optionsMenu = (
          <ScrollMenu>
            {!hasOptions ? (
              <Menu.Item disabled>{noOptionsText}</Menu.Item>
            ) : (
              options.map((option, index) => (
                <Menu.Item
                  key={getItemValue(option)}
                  selected={highlightedIndex === index}
                  disabled={isSelected(option, selectedItem)}
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...getItemProps({ item: option })}
                >
                  {getItemLabel(option)}
                </Menu.Item>
              ))
            )}
          </ScrollMenu>
        )

        const selectItem = (item: Maybe<Item>) => {
          downshiftSelectItem(item)
          setPlaceholder(initialPlaceholder)
          setFilter(EMPTY_VALUE)
        }

        const {
          onBlur,
          onKeyDown,
          onFocus,
          onChange = () => {}
        } = getInputProps({
          onFocus: () => {
            openMenu()
            if (!selectedItem) return

            const currentIndex = options ? options.indexOf(selectedItem) : 0

            setPlaceholder(getItemLabel(selectedItem))
            setInputValue(EMPTY_VALUE)
            setHighlightedIndex(currentIndex)
          },
          onBlur: () => {
            if (options.length === 1) {
              const firstOption = options[0]

              selectItem(firstOption)
            }

            if (!options.length && !allowAny) {
              reset()
              setInputValue(EMPTY_VALUE)
              setPlaceholder(initialPlaceholder)
              setFilter(EMPTY_VALUE)
              return
            }

            if (!selectedItem) return

            if (allowAny && getItemLabel(selectedItem) !== inputValue) {
              if (inputValue !== EMPTY_VALUE) {
                setSelectedItem(null)
                setPlaceholder(initialPlaceholder)
              }
            }

            setInputValue(getItemLabel(selectedItem))
          },
          onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Backspace' && inputValue === EMPTY_VALUE) {
              selectItem(null)
            }

            if (rest.onKeyDown) {
              rest.onKeyDown(event)
            }
          },
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target

            setFilter((value || EMPTY_VALUE).trim())
            setInputValue(value)

            if (!isMatchingMinLength(value, minLength)) {
              return
            }

            event.persist()
            onChangeDebounced(event)
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
            <Input
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...rest}
              icon={loading ? <Loader size='small' /> : null}
              iconPosition='end'
              value={inputValue || EMPTY_VALUE}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              onClick={onFocus}
              placeholder={placeholder}
              width={width}
              onChange={event => {
                onChange(event as FormEvent<HTMLInputElement>)
              }}
              // @ts-ignore
              startAdornment={startAdornment}
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
  allowAny: true,
  debounceTime: DEBOUNCE_TIME,
  loading: false,
  noOptionsText: 'No options',
  onChange: () => {},
  onSelect: () => {},
  onKeyDown: () => {},
  options: [],
  width: 'auto'
}

Autocomplete.displayName = 'Autocomplete'

export default withStyles(styles)(Autocomplete)

import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useState,
  useEffect,
  KeyboardEvent,
  forwardRef,
  ReactNode,
  ComponentType,
  FormEvent
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'
import cx from 'classnames'
import Downshift, {
  StateChangeOptions,
  ControllerStateAndHelpers
} from 'downshift'
import debounce from 'debounce'

import { StandardProps } from '../Picasso'
import Input, { Props as InputProps } from '../Input'
import Menu from '../Menu'
import Loader from '../Loader'
import ScrollMenu from '../ScrollMenu'
import { isSubstring, Maybe } from '../utils'
import styles from './styles'

const DEBOUNCE_TIME = 300
const EMPTY_VALUE = ''

export type Item = {
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
  /** Debounce time in ms for onChange event handler. Set it to 0 to disable debouncing. */
  debounceTime?: number
  /** Width of the component */
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
  onSelect?: (item: Maybe<Item>, helpers: { resetInput: () => void }) => void
  /**  Callback invoked when typing value is changed */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /**  Callback invoked when key is pressed */
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string | null
  ) => void
  /** ReactNode for labels that will be used as start InputAdornment - */
  startAdornment?: ReactNode
  /** Custom input component */
  inputComponent?: ComponentType<InputProps>
}

const isMatchingMinLength = (value: string, minLength?: number) =>
  !minLength || value.length >= minLength

const getItemText = (item: Maybe<Item>) =>
  item ? item.text || EMPTY_VALUE : EMPTY_VALUE

const getItemValue = (item: Maybe<Item>) =>
  item ? item.value || getItemText(item) : EMPTY_VALUE

export const Autocomplete = forwardRef<HTMLInputElement, Props>(
  function Autocomplete(
    {
      classes,
      className,
      debounceTime,
      loading,
      minLength,
      placeholder,
      noOptionsText,
      options: initialOptions,
      style,
      width,
      allowAny,
      onSelect,
      onKeyDown: onKeyDownProp,
      defaultValue,
      value,
      onChange,
      inputComponent,
      ...rest
    },
    ref
  ) {
    useEffect(() => {
      window.console.warn(
        `There is a newer version of this component with the latest fixes and API which can be imported from '@toptal/picasso/lab'.

This version of the component will receive no more updates during v3, and will be replaced by the one in "lab" in the future.
Please update to the new one if you want to get the latest fixes and prepare for the next version.

BREAKING CHANGES:

- \`onChange\` prop function provides a \`string\` as argument instead of an \`Event\`.
- \`debounceTime\` prop removed. Now it is up to the component consumer to debounce any event.
- Beware of how \`value\` and \`defaultValue\` props work now. To simply set an initial value, use \`defaultValue\`. Use \`value\` together with \`onSelect\` for fully controlled mode.`
      )
    }, [])

    const [inputValue, setInputValue] = useState<string | null>(null)
    const [filter, setFilter] = useState(EMPTY_VALUE)
    const [selectedItem, setSelectedItem] = useState<Maybe<Item>>(null)
    const onChangeDebounced = React.useCallback(
      debounceTime === 0 ? onChange! : debounce(onChange!, debounceTime),
      [onChange, debounceTime]
    )

    const handleSelectItem = (item: Maybe<Item>) => {
      if (item === undefined) {
        return
      }
      const internalHelpers = {
        resetInput: () => {
          setInputValue(EMPTY_VALUE)
          setSelectedItem(null)
        }
      }

      setInputValue(getItemText(item))
      setSelectedItem(item)
      onSelect!(item, internalHelpers)
    }

    const handleStateChange = ({ selectedItem }: StateChangeOptions<Item>) => {
      handleSelectItem(selectedItem)
    }

    const options = initialOptions!.filter(item =>
      isSubstring(filter || EMPTY_VALUE, getItemText(item))
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
        handleSelectItem(selectedItem)
      }
    }, [value])

    return (
      <Downshift
        itemToString={item => getItemText(item)}
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
            <ScrollMenu selectedIndex={highlightedIndex}>
              {!hasOptions ? (
                <Menu.Item disabled>{noOptionsText}</Menu.Item>
              ) : (
                options.map((option, index) => (
                  <Menu.Item
                    key={getItemValue(option)}
                    selected={highlightedIndex === index}
                    disabled={isSelected(option, selectedItem)}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...getItemProps({ item: option, index })}
                  >
                    {getItemText(option)}
                  </Menu.Item>
                ))
              )}
            </ScrollMenu>
          )

          const selectItem = (item: Maybe<Item>) => {
            downshiftSelectItem(item)
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

              setHighlightedIndex(currentIndex)
              setInputValue(EMPTY_VALUE)
            },
            onBlur: () => {
              if (!options.length && !allowAny) {
                reset()
                setInputValue(EMPTY_VALUE)
                setFilter(EMPTY_VALUE)
                return
              }

              if (!selectedItem) return

              if (
                allowAny &&
                getItemText(selectedItem) !== inputValue &&
                inputValue !== EMPTY_VALUE
              ) {
                setSelectedItem(null)
              }

              setInputValue(getItemText(selectedItem))
            },
            onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Backspace' && inputValue === EMPTY_VALUE) {
                selectItem(null)
              }
              onKeyDownProp!(event, inputValue)
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

          const InputComponent = inputComponent || Input

          return (
            <div
              className={cx(
                classes.root,
                className,
                classes[`root${capitalize(width!)}`]
              )}
              style={style}
            >
              <InputComponent
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...rest}
                defaultValue={defaultValue as string | undefined}
                ref={ref}
                classes={{}}
                icon={loading ? <Loader size='small' /> : null}
                iconPosition='end'
                value={inputValue || EMPTY_VALUE}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onClick={onFocus}
                placeholder={
                  selectedItem ? getItemText(selectedItem) : placeholder
                }
                width={width}
                onChange={e => {
                  onChange(e as FormEvent<HTMLInputElement>)
                }}
              />
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <div {...getMenuProps()}>{canOpen ? optionsMenu : null}</div>
            </div>
          )
        }}
      </Downshift>
    )
  }
)

Autocomplete.defaultProps = {
  allowAny: true,
  debounceTime: DEBOUNCE_TIME,
  loading: false,
  noOptionsText: 'No options',
  onChange: () => {},
  onKeyDown: () => {},
  onSelect: () => {},
  options: [],
  width: 'auto'
}

Autocomplete.displayName = 'Autocomplete'

export default withStyles(styles)(Autocomplete)

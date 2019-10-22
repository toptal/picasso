import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  forwardRef,
  ReactNode,
  ComponentType,
  useMemo,
  useLayoutEffect,
  useState,
  useRef,
  ChangeEvent
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'
import cx from 'classnames'
import Popper from '@material-ui/core/Popper'

import { StandardProps } from '../../Picasso'
import Input, { Props as InputProps } from '../../Input'
import Menu from '../../Menu'
import Container from '../../Container'
import Loader from '../../Loader'
import ScrollMenu from '../../ScrollMenu'
import Typography from '../../Typography'
import InputAdornment from '../../InputAdornment'
import styles from './styles'

const EMPTY_INPUT_VALUE = ''
const FIRST_ITEM_INDEX = 0

export type Item = {
  text?: string
  [prop: string]: string | undefined
}

function normalizeArrowKey(event: KeyboardEvent<HTMLInputElement>) {
  const { key, keyCode } = event

  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return `Arrow${key}`
  }
  return key
}

/**
 * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
 * it will wrap to either 0 or itemCount - 1.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} baseIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @returns {number} The new index after the move.
 */
function getNextWrappingIndex(
  moveAmount: number,
  baseIndex: number | null,
  itemCount: number
) {
  const itemsLastIndex = itemCount - 1

  if (
    typeof baseIndex !== 'number' ||
    baseIndex < 0 ||
    baseIndex >= itemCount
  ) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1
  }
  let newIndex = baseIndex + moveAmount

  if (newIndex < 0) {
    newIndex = itemsLastIndex
  } else if (newIndex > itemsLastIndex) {
    newIndex = 0
  }
  return newIndex
}

/**
 * Specification has two options to enable/disable autofill:
 * "on"|"off", but google chrome doesn't respect specification and
 * enables autofill for inputs with common name like "email", "address" etc
 * As a workaround it's possible to use any incorrect string as a value of
 * "autocomplete" field. "none" is our current choice.
 */
const AUTOFILL_DISABLED_STATE = 'none'

export const getAutocompletePropValue = (
  enableAutofill: boolean | undefined,
  autoComplete: string | undefined
) => {
  return enableAutofill ? autoComplete : AUTOFILL_DISABLED_STATE
}

export interface AutocompleteState<Item> {
  highlightedIndex: number | null
  isOpen: boolean
}

export interface Props
  extends StandardProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'defaultValue' | 'value' | 'onChange' | 'onSelect' | 'onKeyDown'
    > {
  /**  Callback invoked when `input` element value is changed */
  onChange?: (value: string) => void
  /** The value of the selected option, required for a controlled component. */
  value: string
  /**  Callback invoked when selection changes */
  onSelect?: (item: Item) => void
  /**  Callback invoked when other option selected */
  onOtherOptionSelect?: (item: Item) => void
  /** Placeholder for value */
  placeholder?: string
  /** Text prefix for other option */
  otherOptionText?: string
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Allow to show the other option in the list of options */
  showOtherOption?: boolean
  /** Label to show when no options were found */
  noOptionsText?: string
  /** List of options */
  options?: Item[]
  /** A function that takes a display value from the option item */
  getDisplayValue?: (item: Item | null) => string
  /**  Callback invoked when key is pressed */
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  /** ReactNode for labels that will be used as start InputAdornment - */
  startAdornment?: ReactNode
  /** ReactNode for labels that will be used as end InputAdornment - */
  endAdornment?: ReactNode
  /** Indicate whether `Input` is in error state */
  error?: boolean
  /** Specify icon which should be rendered inside Input */
  icon?: ReactNode
  /** Custom input component */
  inputComponent?: ComponentType<InputProps>
  /** Callback responsible for rendering the option given the option and its index in the list of options */
  renderOption?: (option: Item, index?: number) => ReactNode
  /** Specifies whether the autofill enabled or not, disabled by default */
  enableAutofill?: boolean
}

const getItemText = (item: Item | null) =>
  item && item.text ? item.text : EMPTY_INPUT_VALUE

const getUniqueValue = (value: string) =>
  `${value.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`

export const Autocomplete = forwardRef<HTMLInputElement, Props>(
  function Autocomplete(
    {
      classes,
      className,
      onChange: onInputChange,
      value,
      onSelect,
      onOtherOptionSelect,
      loading,
      placeholder,
      otherOptionText,
      noOptionsText,
      options,
      getDisplayValue,
      style,
      width,
      showOtherOption,
      onKeyDown,
      inputComponent,
      renderOption,
      endAdornment,
      icon,
      error,
      enableAutofill,
      autoComplete,
      ...rest
    },
    ref
  ) {
    const autoCompletePropValue = useMemo(
      () => getAutocompletePropValue(enableAutofill, autoComplete),
      [enableAutofill, autoComplete]
    )

    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const [menuWidth, setMenuWidth] = useState()
    const [state, setState] = useState<AutocompleteState<Item>>({
      highlightedIndex: null,
      isOpen: false
    })

    const { highlightedIndex, isOpen } = state

    const canOpen = isOpen && !loading
    const optionsLength = options!.length
    const otherOption = {
      text: value
    }
    const shouldShowOtherOption =
      showOtherOption &&
      value &&
      options!.every(option => getDisplayValue!(option) !== value)

    useLayoutEffect(() => {
      if (!inputWrapperRef.current) {
        return
      }
      const { width } = inputWrapperRef.current.getBoundingClientRect()

      setMenuWidth(`${width}px`)
    }, [inputWrapperRef.current])

    const handleInputValueChange = (newValue: string) => {
      if (newValue !== value) {
        onInputChange!(newValue)
      }
    }

    const handleSelectItem = (item: Item | null) => {
      const displayValue = getDisplayValue!(item)

      if (item === null || displayValue === null) {
        return
      }

      const isInOptions = options!.find(
        option => getDisplayValue!(option) === displayValue
      )

      if (!isInOptions) {
        onOtherOptionSelect!(item)
        return
      }

      onSelect!(item)
    }

    const keyboardHandlers: {
      [key: string]: (event: KeyboardEvent<HTMLInputElement>) => void
    } = {
      ArrowDown: (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault()

        setState({
          ...state,
          isOpen: true,
          highlightedIndex: getNextWrappingIndex(
            event.shiftKey ? 5 : 1,
            highlightedIndex,
            optionsLength
          )
        })
      },

      ArrowUp: (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault()

        setState({
          ...state,
          isOpen: true,
          highlightedIndex: getNextWrappingIndex(
            event.shiftKey ? -5 : -1,
            highlightedIndex,
            optionsLength
          )
        })
      },

      Enter: (event: KeyboardEvent<HTMLInputElement>) => {
        if (isOpen && highlightedIndex != null) {
          event.preventDefault()

          const item = options ? options[highlightedIndex] : null

          if (item == null) {
            return
          }

          setState({ ...state, isOpen: false })
          handleInputValueChange(getDisplayValue!(item))
          handleSelectItem(item)
        }
      },

      Escape: (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault()

        setState({ isOpen: false, highlightedIndex: null })

        handleInputValueChange(getDisplayValue!(null))
        handleSelectItem(null)
      }
    }

    const optionsMenu = (
      <ScrollMenu selectedIndex={highlightedIndex}>
        {options!.map((option, index) => (
          <Menu.Item
            key={getDisplayValue!(option)}
            role='option'
            selected={highlightedIndex === index}
            onMouseMove={() => {
              if (index === highlightedIndex) {
                return
              }

              setState({ ...state, highlightedIndex: index })

              // We never want to manually scroll when changing state based
              // on `onMouseMove` because we will be moving the element out
              // from under the user which is currently scrolling/moving the
              // cursor
              // this.avoidScrolling = true
              // this.internalSetTimeout(() => (this.avoidScrolling = false), 250)
            }}
            onMouseDown={(event: any) => {
              // This prevents the activeElement from being changed
              // to the item so it can remain with the current activeElement
              // which is a more common use case.
              event!.preventDefault()
            }}
            onClick={() => {
              setState({ ...state, isOpen: false })
              handleInputValueChange(getDisplayValue!(option))
              handleSelectItem(option)
            }}
          >
            {renderOption
              ? renderOption(option, index)
              : getDisplayValue!(option)}
          </Menu.Item>
        ))}

        {shouldShowOtherOption && (
          <Menu.Item
            key={getUniqueValue(value)}
            role='option'
            selected={highlightedIndex === optionsLength}
            className={cx({
              [classes.otherOption]: Boolean(optionsLength)
            })}
            onMouseMove={() => {
              if (optionsLength === highlightedIndex) {
                return
              }

              setState({ ...state, highlightedIndex: optionsLength })

              // We never want to manually scroll when changing state based
              // on `onMouseMove` because we will be moving the element out
              // from under the user which is currently scrolling/moving the
              // cursor
              // this.avoidScrolling = true
              // this.internalSetTimeout(() => (this.avoidScrolling = false), 250)
            }}
            onMouseDown={(event: any) => {
              // This prevents the activeElement from being changed
              // to the item so it can remain with the current activeElement
              // which is a more common use case.
              event!.preventDefault()
            }}
            onClick={() => {
              setState({ ...state, isOpen: false })
              handleInputValueChange(getDisplayValue!(otherOption))
              handleSelectItem(otherOption)
            }}
          >
            <span className={classes.stringContent}>
              <Typography as='span' color='dark-grey'>
                {otherOptionText}
              </Typography>
              {otherOption.text}
            </span>
          </Menu.Item>
        )}

        {!optionsLength && !shouldShowOtherOption && (
          <Menu.Item disabled>{noOptionsText}</Menu.Item>
        )}
      </ScrollMenu>
    )

    const handleFocusOrClick = () => {
      if (!isOpen) {
        setState({
          ...state,
          isOpen: true,
          highlightedIndex: FIRST_ITEM_INDEX
        })

        handleInputValueChange(value)
      }
    }

    const InputComponent = inputComponent || Input
    const loadingComponent = (
      <InputAdornment position='end'>
        <Loader size='small' />
      </InputAdornment>
    )

    const handleChange = (
      event: ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >
    ) => {
      setState({
        ...state,
        isOpen: true,
        highlightedIndex: FIRST_ITEM_INDEX
      })

      handleInputValueChange(event.target.value)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Backspace' && value === EMPTY_INPUT_VALUE) {
        handleInputValueChange(getDisplayValue!(null))
        handleSelectItem(null)

        setState({
          ...state,
          isOpen: false
        })
      }

      const key = normalizeArrowKey(event)

      if (key && keyboardHandlers[key]) {
        keyboardHandlers[key](event)
      }

      onKeyDown!(event, value)
    }

    const handleBlur = () => {
      setState({
        ...state,
        isOpen: false
      })
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
        <Container flex ref={inputWrapperRef}>
          <InputComponent
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...rest}
            aria-autocomplete='list'
            onFocus={handleFocusOrClick}
            onClick={handleFocusOrClick}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            // here we override the value returned from downshift, `off` by default
            autoComplete={autoCompletePropValue}
            error={error}
            icon={icon}
            defaultValue={undefined}
            value={value}
            onChange={handleChange}
            ref={ref}
            placeholder={placeholder}
            endAdornment={loading ? loadingComponent : endAdornment}
            width={width}
          />
        </Container>
        <div role='listbox'>
          {inputWrapperRef.current && (
            <Popper
              open={canOpen}
              anchorEl={inputWrapperRef.current}
              className={classes.popper}
              style={{ width: menuWidth }}
            >
              {optionsMenu}
            </Popper>
          )}
        </div>
      </div>
    )
  }
)

Autocomplete.defaultProps = {
  enableAutofill: false,
  getDisplayValue: getItemText,
  loading: false,
  noOptionsText: 'No options',
  onChange: () => {},
  onKeyDown: () => {},
  onOtherOptionSelect: () => {},
  onSelect: () => {},
  options: [],
  otherOptionText: 'Other option: ',
  showOtherOption: false,
  width: 'auto'
}

Autocomplete.displayName = 'Autocomplete'

export default withStyles(styles)(Autocomplete)

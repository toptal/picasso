import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  forwardRef,
  ReactNode,
  ComponentType,
  FormEvent,
  useMemo,
  useLayoutEffect,
  useState,
  useRef
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'
import cx from 'classnames'
import Popper from '@material-ui/core/Popper'
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift'

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
      const itemValue = getDisplayValue!(item)

      if (item === null || itemValue === null) {
        return
      }

      const isInOptions = options!.find(
        option => getDisplayValue!(option) === itemValue
      )

      if (!isInOptions) {
        onOtherOptionSelect!(item)
        return
      }

      onSelect!(item)
    }

    const downshiftStateReducer = (
      state: DownshiftState<Item>,
      changes: StateChangeOptions<Item>
    ): Partial<StateChangeOptions<Item>> => {
      switch (changes.type) {
        case Downshift.stateChangeTypes.changeInput:
          return { ...changes, highlightedIndex: FIRST_ITEM_INDEX }
        case Downshift.stateChangeTypes.mouseUp:
        case Downshift.stateChangeTypes.blurInput:
          return {
            ...changes,
            inputValue: value,
            selectedItem: null
          }
      }
      return changes
    }

    return (
      <Downshift
        inputValue={value}
        onInputValueChange={handleInputValueChange}
        onChange={handleSelectItem}
        itemToString={getDisplayValue}
        stateReducer={downshiftStateReducer}
      >
        {({
          getMenuProps,
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex,
          selectItem,
          setState
        }) => {
          const canOpen = isOpen && !loading
          const optionsLength = options!.length
          const otherOption = {
            text: value
          }
          const shouldShowOtherOption = showOtherOption && value

          const optionsMenu = (
            <ScrollMenu selectedIndex={highlightedIndex}>
              {options!.map((option, index) => (
                <Menu.Item
                  key={getDisplayValue!(option)}
                  selected={highlightedIndex === index}
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...getItemProps({ item: option, index })}
                >
                  {renderOption
                    ? renderOption(option, index)
                    : getDisplayValue!(option)}
                </Menu.Item>
              ))}

              {shouldShowOtherOption && (
                <Menu.Item
                  key={getUniqueValue(value)}
                  selected={highlightedIndex === optionsLength}
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...getItemProps({
                    item: otherOption,
                    index: optionsLength
                  })}
                  className={cx({
                    [classes.otherOption]: Boolean(optionsLength)
                  })}
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
                isOpen: true,
                inputValue: value,
                highlightedIndex: FIRST_ITEM_INDEX
              })
            }
          }

          const InputComponent = inputComponent || Input
          const loadingComponent = (
            <InputAdornment position='end'>
              <Loader size='small' />
            </InputAdornment>
          )

          const inputProps = getInputProps({
            onFocus: handleFocusOrClick,
            onClick: handleFocusOrClick,
            onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Backspace' && value === EMPTY_INPUT_VALUE) {
                selectItem(null)
              }
              onKeyDown!(event, value)
            },
            // here we override the value returned from downshift, `off` by default
            autoComplete: autoCompletePropValue
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
              <Container flex ref={inputWrapperRef}>
                <InputComponent
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...rest}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...inputProps}
                  error={error}
                  icon={icon}
                  defaultValue={undefined}
                  value={value}
                  onChange={e => {
                    inputProps.onChange!(e as FormEvent<HTMLInputElement>)
                  }}
                  ref={ref}
                  classes={{}}
                  placeholder={placeholder}
                  endAdornment={loading ? loadingComponent : endAdornment}
                  width={width}
                />
              </Container>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <div {...getMenuProps()}>
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
        }}
      </Downshift>
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

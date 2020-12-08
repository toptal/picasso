/* eslint-disable complexity, max-statements */ // Squiggly lines makes code difficult to work with

import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  forwardRef,
  ReactNode,
  ComponentType,
  useRef,
  FocusEventHandler,
  MouseEvent
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

import Input, { InputProps } from '../Input'
import Menu from '../Menu'
import Container from '../Container'
import Loader from '../Loader'
import ScrollMenu from '../ScrollMenu'
import Typography from '../Typography'
import Popper from '../Popper'
import InputAdornment from '../InputAdornment'
import PoweredByGoogle from './PoweredByGoogle'
import { Item, ChangedOptions } from './types'
import useAutocomplete, { EMPTY_INPUT_VALUE } from './useAutocomplete'
import styles from './styles'
import { BaseInputProps } from '../OutlinedInput'

export interface Props
  extends StandardProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'defaultValue' | 'value' | 'onChange' | 'onSelect' | 'onKeyDown' | 'size'
    > {
  /**  Callback invoked when `input` element value is changed */
  onChange?: (value: string, options: ChangedOptions) => void
  /** The value of the selected option, required for a controlled component. */
  value: string
  /**  Callback invoked when selection changes */
  onSelect?: (item: Item, event: MouseEvent | KeyboardEvent) => void
  /**  Callback invoked when other option selected */
  onOtherOptionSelect?: (
    value: string,
    event: MouseEvent | KeyboardEvent
  ) => void
  /** Placeholder for value */
  placeholder?: string
  /** Text prefix for other option */
  otherOptionText?: string
  /** Callback responsible for rendering the other option given the input's value */
  renderOtherOption?: (value: string) => ReactNode
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Width of the menu */
  menuWidth?: string
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Allow to show the other option in the list of options */
  showOtherOption?: boolean
  /** Label to show when no options were found */
  noOptionsText?: string
  /** List of options */
  options?: Item[] | null
  /** A function that takes a display value from the option item */
  getDisplayValue?: (item: Item | null) => string
  /**  Callback invoked when key is pressed */
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  /** Focus event handler */
  onFocus?: FocusEventHandler<HTMLInputElement>
  /** Blur event handler */
  onBlur?: FocusEventHandler<HTMLInputElement>
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
  renderOption?: (option: Item, index: number) => ReactNode
  /** Provide unique key for each option */
  getKey?: (item: Item) => string
  /** Specifies whether the autofill enabled or not, disabled by default */
  enableAutofill?: boolean
  /** Whether to render reset icon when there is a value in the input */
  enableReset?: boolean
  /** DOM element that wraps the Popper */
  popperContainer?: HTMLElement
  inputProps?: BaseInputProps
  /** Show the "Powered By Google" label */
  poweredByGoogle?: boolean
}

const getItemText = (item: Item | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE

export const Autocomplete = forwardRef<HTMLInputElement, Props>(
  function Autocomplete(
    {
      classes,
      className,
      onChange,
      value,
      onSelect,
      onOtherOptionSelect,
      loading,
      placeholder,
      otherOptionText,
      renderOtherOption,
      noOptionsText,
      options,
      getDisplayValue,
      style,
      menuWidth,
      width,
      showOtherOption,
      onKeyDown,
      onFocus,
      onBlur,
      inputComponent,
      renderOption,
      endAdornment,
      icon,
      error,
      enableAutofill,
      autoComplete,
      popperContainer,
      getKey: customGetKey,
      enableReset,
      name,
      poweredByGoogle,
      ...rest
    },
    ref
  ) {
    const getKey = (item: Item) => {
      if (customGetKey) {
        return customGetKey(item)
      }

      const displayValue = getDisplayValue!(item)

      if (!displayValue) {
        console.error(
          'Autocomplete expects you to provide key prop value with getKey or Item.value!'
        )
      }

      return displayValue
    }

    const {
      highlightedIndex,
      isOpen,
      shouldShowOtherOption,
      getItemProps,
      getOtherItemProps,
      getInputProps
    } = useAutocomplete({
      value,
      options,
      getDisplayValue: getDisplayValue!,
      onSelect,
      onOtherOptionSelect,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
      enableReset,
      showOtherOption
    })

    const optionsLength = options ? options!.length : 0

    const optionsMenu = options && (
      <ScrollMenu selectedIndex={highlightedIndex}>
        {options!.map((option, index) => (
          <Menu.Item
            size='medium'
            key={getKey(option)}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getItemProps(index, option)}
            titleCase={false}
            description={option.description}
            className={classes.option}
          >
            {renderOption
              ? renderOption(option, index)
              : getDisplayValue!(option)}
          </Menu.Item>
        ))}

        {shouldShowOtherOption && (
          <Menu.Item
            size='medium'
            key='other-option'
            className={`${classes.option} ${classes.otherOption}`}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getOtherItemProps(optionsLength, value)}
            titleCase={false}
          >
            {renderOtherOption ? (
              renderOtherOption(value)
            ) : (
              <span className={classes.stringContent}>
                <Typography as='span' color='dark-grey'>
                  {otherOptionText}
                </Typography>
                {value}
              </span>
            )}
          </Menu.Item>
        )}

        {!optionsLength && !shouldShowOtherOption && (
          <Menu.Item size='medium' titleCase={false} disabled>
            {noOptionsText}
          </Menu.Item>
        )}

        {optionsLength > 0 && poweredByGoogle && (
          <Container flex justifyContent='flex-end' padded='xsmall'>
            <PoweredByGoogle />
          </Container>
        )}
      </ScrollMenu>
    )

    const InputComponent = inputComponent || Input
    const loadingComponent = (
      <InputAdornment position='end' disablePointerEvents>
        <Loader size='small' />
      </InputAdornment>
    )

    const inputWrapperRef = useRef<HTMLDivElement>(null)

    return (
      <div
        className={cx(
          classes.root,
          className,
          classes[`root${capitalize(width!)}`]
        )}
        style={style}
        role='combobox'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <Container flex ref={inputWrapperRef}>
          {!enableAutofill && name && (
            <input type='hidden' value={value} name={name} />
          )}
          <InputComponent
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...rest}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getInputProps()}
            error={error}
            icon={icon}
            defaultValue={undefined}
            value={value}
            ref={ref}
            placeholder={placeholder}
            inputProps={rest.inputProps}
            endAdornment={loading ? loadingComponent : endAdornment}
            width={width}
            name={enableAutofill ? name : undefined}
            autoComplete={enableAutofill ? autoComplete : autoComplete || 'off'}
          />
        </Container>
        <div role='listbox'>
          {isOpen && inputWrapperRef.current && optionsMenu && (
            <Popper
              autoWidth
              width={menuWidth}
              placement='bottom-start'
              open={isOpen && !loading}
              anchorEl={inputWrapperRef.current}
              container={popperContainer}
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
  onFocus: () => {},
  onBlur: () => {},
  onOtherOptionSelect: () => {},
  onSelect: () => {},
  options: [],
  otherOptionText: 'Other option: ',
  showOtherOption: false,
  width: 'auto',
  enableReset: true,
  poweredByGoogle: false
}

Autocomplete.displayName = 'Autocomplete'

export default withStyles(styles)(Autocomplete)

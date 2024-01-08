/* eslint-disable max-lines */
/* eslint-disable complexity, max-statements, max-lines-per-function */ // Squiggly lines makes code difficult to work with

import type {
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  ComponentType,
  FocusEventHandler,
  MouseEvent,
  Ref,
} from 'react'
import React, { forwardRef, useRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import { isForwardRef } from '@toptal/picasso-shared'
import type { PopperOptions } from 'popper.js'

import type { InputProps } from '../Input'
import Input from '../Input'
import { MenuCompound as Menu } from '../MenuCompound'
import Container from '../Container'
import Loader from '../Loader'
import SelectOptions from '../SelectOptions'
import Popper from '../Popper'
import InputAdornment from '../InputAdornment'
import PoweredByGoogle from './PoweredByGoogle'
import NoOptionsMenuItem from './NoOptionsMenuItem'
import OtherOptionMenuItem from './OtherOptionMenuItem'
import type { Item, ChangedOptions } from './types'
import { useAutocomplete, EMPTY_INPUT_VALUE } from './use-autocomplete'
import styles from './styles'
import type { BaseInputProps, Status } from '../OutlinedInput'
import unsafeErrorLog from '../utils/unsafe-error-log'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'
import { useFieldsLayoutContext } from '../FieldsLayout'

export interface Props
  extends BaseProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'defaultValue' | 'value' | 'onChange' | 'onSelect' | 'onKeyDown' | 'size'
    > {
  /** Callback invoked when `input` element value is changed */
  onChange?: (value: string, options: ChangedOptions) => void
  /** The value of the selected option, required for a controlled component. */
  value: string
  /** Whether a component is disabled */
  disabled?: boolean
  /** Callback invoked when selection changes */
  onSelect?: (item: Item, event: MouseEvent | KeyboardEvent) => void
  /** Whether to close popper upon selection */
  closeOnSelect?: boolean
  /** Callback invoked when other option selected */
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
  noOptionsText?: string | null
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
  /**
   * @deprecated [FX-4715] Use the `status` prop instead to both support success and error states
   * Indicate whether `Autocomplete` is in error state
   */
  error?: boolean
  /** Indicate `Autocomplete` status */
  status?: Status
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
  /** Callback invoked when reset button was clicked */
  onResetClick?: (
    event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => void
  /** DOM element that wraps the Popper */
  popperContainer?: HTMLElement
  /** Options provided to the popper.js instance */
  popperOptions?: PopperOptions
  inputProps?: BaseInputProps
  /** Show the "Powered By Google" label */
  poweredByGoogle?: boolean
  testIds?: InputProps['testIds'] & {
    menuItem?: string
    scrollMenu?: string
    otherOption?: string
    noOptions?: string
    loadingAdornment?: string
    input?: string
    disableAutofillInput?: string
  }
  highlight?: 'autofill'
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAutocomplete',
})

const getItemText = (item: Item | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE

export const Autocomplete = forwardRef<HTMLInputElement, Props>(
  function Autocomplete(props, customRef) {
    const {
      autoComplete,
      className,
      enableAutofill,
      enableReset,
      endAdornment,
      error,
      status,
      getDisplayValue = getItemText,
      getKey: customGetKey,
      icon,
      inputComponent,
      loading,
      menuWidth,
      name,
      noOptionsText = 'No options',
      closeOnSelect,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onOtherOptionSelect,
      onResetClick,
      onSelect,
      options,
      otherOptionText = 'Other option: ',
      placeholder,
      popperContainer,
      popperOptions,
      poweredByGoogle,
      renderOption,
      renderOtherOption,
      showOtherOption,
      style,
      testIds,
      value,
      width = 'auto',
      disabled = false,
      highlight,
      ...rest
    } = props

    const inputRef = useRef<HTMLInputElement | null>(null)
    let ref: Ref<HTMLInputElement> | undefined = customRef || inputRef

    if (inputComponent && !isForwardRef(inputComponent)) {
      ref = undefined
      unsafeErrorLog(
        'You provided `inputComponent` prop to Autocomplete without using React.forwardRef wrapper. This is not supported and may cause unexpected behavior. Consider wrapping your input component with React.forwardRef.'
      )
    }

    // TODO: [FX-4715]
    usePropDeprecationWarning({
      props,
      name: 'error',
      componentName: 'Autocomplete',
      description:
        'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
    })

    const classes = useStyles()

    const getKey = (item: Item) => {
      if (customGetKey) {
        return customGetKey(item)
      }

      const displayValue = getDisplayValue(item)

      if (!displayValue) {
        unsafeErrorLog(
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
      getInputProps,
    } = useAutocomplete({
      value,
      disabled,
      options,
      closeOnSelect,
      getDisplayValue,
      onSelect,
      onOtherOptionSelect,
      onResetClick,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
      enableReset,
      showOtherOption,
      ref,
    })

    const optionsLength = options ? options.length : 0

    const optionsMenu = options && (
      <SelectOptions
        data-testid={testIds?.scrollMenu}
        selectedIndex={highlightedIndex}
        fixedFooter={
          optionsLength > 0 &&
          poweredByGoogle && <PoweredByGoogle classes={classes} />
        }
      >
        {options?.map((option, index) => (
          <Menu.Item
            data-testid={
              testIds?.menuItem ? `${testIds?.menuItem}-${index}` : undefined
            }
            key={getKey(option)}
            {...getItemProps(index, option)}
            titleCase={false}
            description={option.description}
            className={classes.option}
          >
            {renderOption
              ? renderOption(option, index)
              : getDisplayValue(option)}
          </Menu.Item>
        ))}
        {shouldShowOtherOption && (
          <OtherOptionMenuItem
            data-testid={testIds?.otherOption}
            value={value}
            classes={classes}
            renderOtherOption={renderOtherOption}
            otherOptionText={otherOptionText}
            {...getOtherItemProps(optionsLength, value)}
          />
        )}
        {!optionsLength && !shouldShowOtherOption && noOptionsText && (
          <NoOptionsMenuItem data-testid={testIds?.noOptions}>
            {noOptionsText}
          </NoOptionsMenuItem>
        )}
      </SelectOptions>
    )

    const { layout } = useFieldsLayoutContext()

    const InputComponent = inputComponent || Input
    const loadingComponent = (
      <InputAdornment
        data-testid={testIds?.loadingAdornment}
        position='end'
        disablePointerEvents
      >
        <Loader size='small' />
      </InputAdornment>
    )

    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const inputProps = getInputProps()

    return (
      <div
        className={cx(
          classes.root,
          className,
          classes[`root${capitalize(width)}` as 'rootAuto'],
          {
            [classes.horizontalLayout]: layout === 'horizontal',
          }
        )}
        style={style}
        role='combobox'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <Container flex ref={inputWrapperRef} onClick={inputProps.onClick}>
          {!enableAutofill && name && (
            <input
              type='hidden'
              value={value}
              name={name}
              data-testid={testIds?.disableAutofillInput}
            />
          )}
          <InputComponent
            {...rest}
            {...inputProps}
            status={error ? 'error' : status}
            icon={icon}
            disabled={disabled}
            defaultValue={undefined}
            value={value}
            ref={ref}
            placeholder={placeholder}
            inputProps={rest.inputProps}
            endAdornment={loading ? loadingComponent : endAdornment}
            width={width}
            name={enableAutofill ? name : undefined}
            autoComplete={enableAutofill ? autoComplete : autoComplete || 'off'}
            testIds={testIds}
            data-testid={testIds?.input}
            highlight={highlight}
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
              popperOptions={popperOptions}
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
  onResetClick: () => {},
  onSelect: () => {},
  options: [],
  otherOptionText: 'Other option: ',
  showOtherOption: false,
  width: 'auto',
  enableReset: true,
  poweredByGoogle: false,
  disabled: false,
  status: 'default',
}

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete

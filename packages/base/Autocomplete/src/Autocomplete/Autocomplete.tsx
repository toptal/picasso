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
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { isForwardRef } from '@toptal/picasso-shared'
import type { PopperOptions } from 'popper.js'
import { Input } from '@toptal/picasso-input'
import { Container } from '@toptal/picasso-container'
import { Loader } from '@toptal/picasso-loader'
import { Popper } from '@toptal/picasso-popper'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import { unsafeErrorLog } from '@toptal/picasso-utils'
import type { InputProps } from '@toptal/picasso-input'
import type { BaseInputProps, Status } from '@toptal/picasso-outlined-input'
import { useFieldsLayoutContext } from '@toptal/picasso-form'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { Item, ChangedOptions } from './types'
import { useAutocomplete, EMPTY_INPUT_VALUE } from './use-autocomplete'
import { rootClassByWidth } from './styles'
import type { OptionsMenuProps } from './OptionsMenu'
import OptionsMenu from './OptionsMenu'

export interface Props
  extends BaseProps,
    Pick<
      OptionsMenuProps,
      | 'otherOptionText'
      | 'renderOtherOption'
      | 'noOptionsText'
      | 'renderOption'
      | 'poweredByGoogle'
    >,
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
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Width of the menu */
  menuWidth?: string
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Allow to show the other option in the list of options */
  showOtherOption?: boolean
  /** List of options */
  options?: Item[] | null
  /** A function that takes a display value from the option item */
  getDisplayValue?: OptionsMenuProps['getDisplayValue']
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
  /** Indicate `Autocomplete` status */
  status?: Status
  /** Specify icon which should be rendered inside Input */
  icon?: ReactNode
  /** Custom input component */
  inputComponent?: ComponentType<InputProps>
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
  /** Component size */
  size?: SizeType<'medium' | 'large'>
}

const getItemText = (item: Item | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE

export const Autocomplete = forwardRef<HTMLInputElement, Props>(
  function Autocomplete(
    {
      enableAutofill = false,
      getDisplayValue = getItemText,
      loading = false,
      noOptionsText = 'No options',
      onChange = () => {},
      onKeyDown = () => {},
      onFocus = () => {},
      onBlur = () => {},
      onOtherOptionSelect = () => {},
      onResetClick = () => {},
      onSelect = () => {},
      options = [],
      otherOptionText = 'Other option: ',
      showOtherOption = false,
      width = 'auto',
      enableReset = true,
      poweredByGoogle = false,
      disabled = false,
      status = 'default',
      ...props
    },
    customRef
  ) {
    const {
      autoComplete,
      className,
      endAdornment,
      getKey,
      icon,
      inputComponent,
      menuWidth,
      name,
      closeOnSelect,
      placeholder,
      popperContainer,
      popperOptions,
      renderOption,
      renderOtherOption,
      style,
      testIds,
      value,
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

    const optionsMenu = (
      <OptionsMenu
        value={value}
        shouldShowOtherOption={shouldShowOtherOption}
        options={options}
        highlightedIndex={highlightedIndex}
        testIds={testIds}
        poweredByGoogle={poweredByGoogle}
        renderOtherOption={renderOtherOption}
        otherOptionText={otherOptionText}
        getKey={getKey}
        getDisplayValue={getDisplayValue}
        getItemProps={getItemProps}
        getOtherItemProps={getOtherItemProps}
        renderOption={renderOption}
        noOptionsText={noOptionsText}
      />
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
        className={twMerge(
          'relative',
          layout === 'horizontal' ? 'w-full' : rootClassByWidth[width],
          className
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
            status={status}
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

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete

/* eslint-disable max-lines, complexity, max-lines-per-function, max-statements */
import React, {
  ReactNode,
  useRef,
  ChangeEvent,
  InputHTMLAttributes
} from 'react'
import cx from 'classnames'
import { Theme, makeStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import { Search16 } from '@toptal/picasso/Icon'
import PopperJs from 'popper.js'
import { BaseProps, SizeType } from '@toptal/picasso-shared'

import OutlinedInput from '../OutlinedInput'
import Popper from '../Popper'
import ScrollMenu from '../ScrollMenu'
import MenuItem from '../MenuItem'
import { disableUnsupportedProps, useCombinedRefs } from '../utils'
import { FeatureOptions } from '../utils/disable-unsupported-props'
import { Option, ValueType, ItemProps, FocusEventType } from './types'
import useSelectProps from './hooks/use-select-props'
import { getOptionText, getSelection } from './hooks/utils'
import useAdornments from './hooks/use-adornments'
import styles from './styles'
import { documentable, forwardRef } from '../utils/forward-ref'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'
import noop from '../utils/noop'
import SelectCaret from '../SelectCaret'
import useSelectState from './hooks/use-select-state'

const useStyles = makeStyles<Theme>(styles)

/**
 * Select props are generalized over possible values in the component and whether
 * Select should be a multiselect. If you want `onChange` to take a handler that
 * can take array (for multiselect) you should set `M` to `true`. By default it's
 * single select.
 *
 * @param T The type of the value in the `Select`, can be either `number` or `string`
 * @param M The `boolean` type of the `multiple` property to indicate whether `onChange` will expect handler to accept plain `T` or array of `T`
 * @param V Technical type, don't pass type argument to it directly
 */
export interface Props<
  T extends ValueType = ValueType,
  M extends boolean = boolean,
  V = M extends true ? T[] : T
>
  extends BaseProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'onChange' | 'size' | 'color' | 'value'
    > {
  /** If true, the 'Select' will be disabled */
  disabled?: boolean
  /** Indicate whether `Select` is in error state */
  error?: boolean
  /** Component ID */
  id?: string
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Width of the menu */
  menuWidth?: string
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Placeholder option which is selected by default */
  placeholder?: string
  /** Placeholder for search input */
  searchPlaceholder?: string
  /** Whether icon should be placed at the beginning or end of the `Input` */
  iconPosition?: 'start' | 'end'
  /** Specify icon which should be rendered inside Input */
  icon?: ReactNode
  /** Callback invoked when `Select` changes its state. */
  onChange?: (
    event: ChangeEvent<{
      name?: string | undefined
      value: V
    }>
  ) => void
  /** @deprecated Callback invoked when search value changes */
  onSearchChange?: (value: string) => void
  /** Label to show when no options were found */
  noOptionsText?: string
  /** List of options to be rendered as `Select` */
  options: Option<T>[]
  /** Callback responsible for rendering the option given the option and its index in the list of options */
  renderOption?: (option: Option<T>, index?: number) => ReactNode
  /** A function that takes a display value from the option item */
  getDisplayValue?: (option: Option | null) => string
  /** Selected value */
  value?: V
  /** Allow selecting multiple values */
  multiple?: M
  /**
   * Size of component
   * @default medium
   */
  size?: SizeType<'small' | 'medium'>
  /** Whether to render reset icon which clears selected value */
  enableReset?: boolean
  popperContainer?: HTMLElement
  /** Defines the minimum options number to show the search */
  searchThreshold?: number
  /** Specifies whether the autofill enabled or not, disabled by default */
  enableAutofill?: boolean
  ref?: React.Ref<HTMLInputElement>
}

type OptionsProps = Pick<
  Props,
  'options' | 'value' | 'multiple' | 'renderOption' | 'size' | 'noOptionsText'
> & {
  highlightedIndex: number | null
  filterOptionsValue: string
  getItemProps: (index: number, option: Option) => ItemProps
  onBlur?: FocusEventType
  fixedHeader?: ReactNode
}

const DEFAULT_EMPTY_ARRAY_VALUE: ValueType[] = []

interface SelectOptionProps {
  children?: ReactNode
  description?: ReactNode
  onMouseDown: (event: React.MouseEvent) => void
  onMouseEnter: () => void
  close: () => void
  selected: boolean
  highlighted: boolean
  multiple?: boolean
  size?: SizeType<'small' | 'medium'>
  onItemSelect: (event: React.MouseEvent, option: Option) => void
  option: Option
}

const SelectOption = React.memo(
  ({
    option,
    size,
    onMouseDown,
    onMouseEnter,
    selected,
    highlighted,
    onItemSelect,
    multiple,
    description,
    children,
    close
  }: SelectOptionProps) => {
    return (
      <MenuItem
        role='option'
        aria-selected={highlighted}
        value={option.value}
        size={size}
        selected={highlighted}
        checkmarked={selected}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onClick={(event: React.MouseEvent) => {
          if (!multiple) {
            close()
          }

          onItemSelect(event, option)
        }}
        titleCase={false}
        description={description}
      >
        {children}
      </MenuItem>
    )
  }
)

const purifyProps = (props: Props<any, any>): Props<ValueType, boolean> => {
  const sizeOptions: FeatureOptions<Props> = {
    featureProps: {
      size: 'small'
    },
    unsupportedProps: {
      icon: undefined,
      loading: false
    }
  }

  return disableUnsupportedProps('Select', props, sizeOptions)
}

const renderOptions = ({
  options,
  renderOption,
  highlightedIndex,
  getItemProps,
  onBlur,
  value,
  multiple,
  size,
  filterOptionsValue,
  noOptionsText,
  fixedHeader
}: OptionsProps) => {
  if (!options.length && filterOptionsValue) {
    return (
      <ScrollMenu fixedHeader={fixedHeader}>
        <MenuItem titleCase={false} disabled>
          {noOptionsText}
        </MenuItem>
      </ScrollMenu>
    )
  }

  const optionComponents = options.map((option, currentIndex) => {
    const { close, onMouseDown, onMouseEnter, onItemSelect } = getItemProps(
      currentIndex,
      option
    )
    const selection = getSelection(options, value)

    return (
      <SelectOption
        key={option.key || option.value}
        option={option}
        size={size}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        selected={selection.isOptionSelected(option)}
        highlighted={highlightedIndex === currentIndex}
        multiple={multiple}
        close={close}
        onItemSelect={onItemSelect}
        description={option.description}
      >
        {renderOption?.(option)}
      </SelectOption>
    )
  })

  return (
    <ScrollMenu
      fixedHeader={fixedHeader}
      onBlur={onBlur}
      selectedIndex={highlightedIndex}
    >
      {optionComponents}
    </ScrollMenu>
  )
}

export const Select = documentable(
  forwardRef(
    <T extends ValueType, M extends boolean = false>(
      props: Props<T, M>,
      ref: React.Ref<HTMLInputElement> | null
    ) => {
      usePropDeprecationWarning({
        props,
        name: 'onSearchChange',
        componentName: 'Select',
        description:
          'Use the Autocomplete component if you require dynamic options.'
      })

      const {
        className,
        style,
        width,
        menuWidth,
        loading,
        id,
        icon,
        iconPosition,
        name,
        noOptionsText,
        renderOption,
        placeholder,
        disabled,
        error,
        multiple,
        value = multiple ? DEFAULT_EMPTY_ARRAY_VALUE : '',
        size,
        enableReset,
        popperContainer,
        enableAutofill,
        autoComplete,
        searchPlaceholder,
        /* eslint-disable @typescript-eslint/no-unused-vars */
        searchThreshold,
        getDisplayValue,
        options,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...rest
      } = purifyProps(props)

      const classes = useStyles()

      const selectRef = useCombinedRefs<HTMLInputElement>(
        ref,
        useRef<HTMLInputElement>(null)
      )
      const searchInputRef = useRef<HTMLInputElement>(null)
      const popperRef = useRef<PopperJs>(null)
      const inputWrapperRef = useRef<HTMLDivElement>(null)

      const selectState = useSelectState(props)
      const {
        highlightedIndex,
        isOpen,
        showSearch,
        filterOptionsValue,
        displayValue,
        selection,
        filteredOptions
      } = selectState
      const {
        getItemProps,
        getRootProps,
        getInputProps,
        getSearchInputProps
      } = useSelectProps({
        selectRef,
        popperRef,
        searchInputRef,
        selectProps: props,
        selectState
      })

      const searchInput = showSearch ? (
        <MenuItem as='div' size={size} nonSelectable>
          <OutlinedInput
            inputRef={searchInputRef}
            className={classes.searchOutlinedInput}
            startAdornment={<Search16 className={classes.searchInputIcon} />}
            placeholder={searchPlaceholder}
            size={size}
            value={filterOptionsValue}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getSearchInputProps()}
          />
        </MenuItem>
      ) : null

      const rootProps = getRootProps()

      const [startAdornment, endAdornment] = useAdornments({
        position: iconPosition,
        icon,
        loading,
        disabled
      })

      const selectComponent = (
        <>
          <div
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...rootProps}
            className={classes.inputWrapper}
          >
            {!enableAutofill && name && (
              <input type='hidden' value={displayValue} name={name} />
            )}
            <OutlinedInput
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}
              inputRef={selectRef}
              error={error}
              disabled={disabled}
              id={id}
              startAdornment={startAdornment}
              endAdornment={endAdornment}
              // Input specific props
              value={displayValue}
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...getInputProps()}
              placeholder={placeholder}
              width={width}
              readOnly
              defaultValue={undefined}
              className={classes.outlinedInput}
              inputProps={{
                size: 1 // let input to have smallest width by default for width:'shrink'
              }}
              size={size}
              role='textbox'
              enableReset={enableReset ? selection.isSelected() : false}
              autoComplete={
                enableAutofill ? autoComplete : autoComplete || 'off'
              }
              name={enableAutofill ? name : undefined}
            />
            <SelectCaret disabled={disabled} />
          </div>
          {!disabled && (
            <Popper
              ref={popperRef}
              autoWidth
              width={menuWidth}
              placement='bottom-start'
              open={isOpen}
              anchorEl={inputWrapperRef.current}
              container={popperContainer}
            >
              {isOpen &&
                renderOptions({
                  options: filteredOptions,
                  renderOption,
                  highlightedIndex,
                  getItemProps,
                  onBlur: rootProps.onBlur,
                  value,
                  filterOptionsValue,
                  multiple,
                  size,
                  noOptionsText,
                  fixedHeader: searchInput
                })}
            </Popper>
          )}
        </>
      )

      return (
        <div
          className={cx(
            classes.root,
            className,
            classes[`root${capitalize(width!)}`],
            {
              [classes.rootDisabled]: disabled
            }
          )}
          style={style}
          ref={inputWrapperRef}
        >
          {selectComponent}
        </div>
      )
    }
  )
)

Select.defaultProps = {
  disabled: false,
  error: false,
  getDisplayValue: getOptionText,
  iconPosition: 'start',
  loading: false,
  noOptionsText: 'No matches found',
  onChange: noop,
  onBlur: noop,
  renderOption: (option: Option) => option.text,
  size: 'medium',
  width: 'full',
  searchThreshold: 10,
  enableAutofill: false,
  searchPlaceholder: 'Search'
}

Select.displayName = 'Select'

export default Select

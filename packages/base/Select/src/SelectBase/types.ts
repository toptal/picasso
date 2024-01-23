import type {
  HTMLAttributes,
  InputHTMLAttributes,
  ChangeEvent,
  ReactNode,
} from 'react'
import type PopperJs from 'popper.js'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import type { OutlinedInputProps, Status } from '@toptal/picasso-outlined-input'

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
export interface SelectProps<
  T extends ValueType = ValueType,
  M extends boolean = boolean,
  V = M extends true ? T[] : T
> extends BaseProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'onChange' | 'size' | 'color' | 'value'
    > {
  /** If true, the 'Select' will be disabled */
  disabled?: boolean
  /** Whether to render select options in portal. Should be disabled in Modals */
  disablePortal?: boolean
  /** @deprecated [FX-4715] Indicate whether `Select` is in error state */
  error?: boolean
  /** Indicate whether `Select` is in `error` or `default` state */
  status?: Extract<Status, 'error' | 'default'>
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
  /** Label to show when no options were found */
  noOptionsText?: string
  /** List of options or option groups to be rendered as `Select` */
  options: Option<T>[] | OptionGroups<T>
  /** Callback responsible for rendering the option given the option and its index in the list of options */
  renderOption?: (option: Option<T>, index?: number) => ReactNode
  /** A function that takes a display value from the option item */
  getDisplayValue?: (option: Option | null) => string
  /** Selected value */
  value?: V
  /** Allow selecting multiple values */
  multiple?: M
  /** Whether to render native browser select or not */
  native?: boolean
  /**
   * Component size
   * @default medium
   */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Whether to render reset icon which clears selected value */
  enableReset?: boolean
  /** Whether to render reset icon which clears search input value */
  enableResetSearch?: boolean
  popperContainer?: HTMLElement
  /** Defines the minimum options number to show the search
   * @default 10
   */
  searchThreshold?: number
  /** Limits number of options to display on the list
   * @default 200
   */
  limit?: number
  /** Specifies whether the autofill enabled or not, disabled by default */
  enableAutofill?: boolean
  /** A function that is invoked during search. It takes an array of options and a search value and returns filtered options */
  filterOptions?: (
    options: Option[],
    searchValue: string,
    getDisplayValue?: (option: Option | null) => string
  ) => Option[]
  ref?: React.Ref<HTMLInputElement>
  testIds?: OutlinedInputProps['testIds'] & {
    noOptions?: string
    loader?: string
    limitFooter?: string
    searchInput?: string
  }
  highlight?: 'autofill'
}

export type ValueType = string | number

export type Option<T extends string | number = string | number> = {
  key?: number
  text: string
  description?: string
  value: T
  disabled?: boolean
  [prop: string]: string | number | undefined | boolean
}

export type OptionGroups<T extends string | number = string | number> = {
  [group: string]: Option<T>[]
}

export type ItemProps = {
  onMouseEnter: () => void
  onMouseDown: (event: React.MouseEvent) => void
  onClick: (event: React.MouseEvent) => void
}

export type FocusEventType = (event: React.FocusEvent<HTMLInputElement>) => void

export type Selection = {
  isSelected: () => boolean
  isOptionSelected: (option: Option) => boolean
  display: (getDisplayValue: (option: Option | null) => string) => string
}

export interface UseSelectStateProps {
  getDisplayValue: (option: Option | null) => string
  options: Option[]
  disabled?: boolean
  multiple?: boolean
  value?: ValueType | ValueType[]
  searchThreshold?: number
  limit?: number
}

export type UseSelectStateOutput = {
  isOpen: boolean
  canOpen: boolean
  open: () => void
  close: () => void
  highlightedIndex: number
  closeOnEnter: boolean
  setHighlightedIndex: (index: number) => void
  setFilterOptionsValue: (value: string) => void
  showSearch: boolean
  filterOptionsValue: string
  displayValue: string
  selection: Selection
  filteredOptions: Option[] | OptionGroups
  emptySelectValue: string | string[]
  selectedOptions: Option[]
}

export interface UseSelectProps<
  T extends ValueType = ValueType,
  M extends boolean = boolean,
  V = M extends true ? T[] : T
> {
  searchInputRef?: React.Ref<HTMLInputElement>
  selectRef: React.Ref<HTMLInputElement>
  popperRef?: React.Ref<PopperJs>
  selectProps: SelectProps<T, M, V>
  selectState: UseSelectStateOutput
}

type GetRootProps = () => {
  onFocus: FocusEventType
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  onBlur: FocusEventType
}
type GetInputProps = () => Partial<HTMLAttributes<HTMLInputElement>>
type GetSearchInputProps = () => Partial<HTMLAttributes<HTMLInputElement>>

export interface UseSelectOutput {
  getItemProps: (item: Option, index: number) => ItemProps
  getRootProps: GetRootProps
  getInputProps: GetInputProps
  getSearchInputProps: GetSearchInputProps
}

/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import {
  KeyboardEvent,
  useState,
  ChangeEvent,
  useCallback,
  HTMLAttributes,
  useEffect,
  useMemo
} from 'react'
import PopperJs from 'popper.js'

import { Option, ItemProps, FocusEventType, ValueType } from '../types'
import {
  Selection,
  isOptionInSelectedValues,
  getSelection,
  removeDuplicatedOptions,
  isEmpty,
  getSelectedOptions,
  getNextWrappingIndex,
  normalizeArrowKey
} from './utils'
import { isSubstring } from '../../utils'
import { Props as SelectProps } from '../Select'

export const EMPTY_INPUT_VALUE = ''

type GetRootProps = () => {
  onFocus: FocusEventType
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  onBlur: FocusEventType
}
type GetInputProps = () => Partial<HTMLAttributes<HTMLInputElement>>
type GetSearchInputProps = () => Partial<HTMLAttributes<HTMLInputElement>>

interface UseSelectOutput {
  getItemProps: (index: number, item: Option) => ItemProps
  getRootProps: GetRootProps
  getInputProps: GetInputProps
  getSearchInputProps: GetSearchInputProps
  isOpen: boolean
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
  showSearch: boolean
  filterOptionsValue: string
  displayValue: string
  selection: Selection
  filteredOptions: Option[]
  emptySelectValue: string | string[]
}

const useSelect = <T extends ValueType, M extends boolean = false>(
  externalProps: ExternalProps<T, M>
): UseSelectOutput => {
  const internalProps = useInternalProps(externalProps)

  const handleClick = useClickHandler(internalProps)
  const handleFocus = internalProps.onFocus
  const handleSelectBlur = useSelectBlurHandler({
    ...internalProps,
    popperRef: externalProps.popperRef
  })
  const handleSearchBlur = useSearchBlurHandler({
    ...internalProps,
    popperRef: externalProps.popperRef,
    selectRef: externalProps.selectRef
  })
  const handleEscapeKeyDown = useEscapeKeyDownHandler(internalProps)
  const handleEnterOrSpaceKeyDown = useEnterOrSpaceKeyDownHandler(internalProps)
  const handleArrowsKeyDown = useArrowsKeyDownHandler(internalProps)
  const handleResetClick = useResetClickHandler(internalProps)
  const handleSearchChange = useSearchChangeHandler(internalProps)
  const handleItemOnMouseDown = useItemOnMouseDownHandler()

  // eslint-disable-next-line max-lines-per-function
  // eslint-disable-next-line complexity
  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = normalizeArrowKey(event)

    if (key === 'Tab') {
      focusRef(externalProps.selectRef)
      event.preventDefault()
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      handleArrowsKeyDown(key, event)
    } else if (key === 'Enter') {
      handleEnterOrSpaceKeyDown(event)
    } else if (key === 'Escape') {
      handleEscapeKeyDown(event)
    }

    externalProps.onKeyDown?.(event)
  }

  // eslint-disable-next-line complexity
  const handleSelectKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (externalProps.native) {
      externalProps.onKeyDown?.(event)

      // for the native select we don't want to prevent defaults for the event
      // and don't need any manual operations for keydown event
      return
    }

    const isValidInputValue =
      Boolean(event.key.match(/^[A-z\d]$/)) || event.key === 'Backspace'

    if (isValidInputValue) {
      focusRef(externalProps.searchInputRef)
    }

    const key = normalizeArrowKey(event)

    if (key === 'Tab' && internalProps.isOpen && internalProps.showSearch) {
      event.preventDefault()
      focusRef(externalProps.searchInputRef)
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      handleArrowsKeyDown(key, event)
    } else if (key === 'Enter' || key === ' ') {
      handleEnterOrSpaceKeyDown(event)
    } else if (key === 'Escape') {
      handleEscapeKeyDown(event)
    }

    externalProps.onKeyDown?.(event)
  }

  const getItemProps = (index: number, item: Option): ItemProps => ({
    role: 'option',
    'aria-selected': internalProps.highlightedIndex === index,
    onMouseEnter: () => {
      if (index === internalProps.highlightedIndex) {
        return
      }

      internalProps.setHighlightedIndex(index)
    },
    onMouseDown: handleItemOnMouseDown,
    close,
    onItemSelect: internalProps.onSelect,
    onClick: (event: React.MouseEvent) => {
      close()

      internalProps.onSelect(event, item)
    }
  })

  const getRootProps = () => ({
    onFocus: handleFocus,
    onClick: handleClick,
    onBlur: handleSelectBlur
  })

  const getInputProps = () => ({
    onKeyDown: handleSelectKeyDown,
    onResetClick: handleResetClick
  })

  const getSearchInputProps = () => ({
    'aria-autocomplete': 'list' as React.AriaAttributes['aria-autocomplete'],
    onChange: handleSearchChange,
    onKeyDown: handleSearchKeyDown,
    onBlur: handleSearchBlur
  })

  return {
    getItemProps,
    getRootProps,
    getInputProps,
    getSearchInputProps,
    isOpen: internalProps.isOpen,
    highlightedIndex: internalProps.highlightedIndex,
    setHighlightedIndex: internalProps.setHighlightedIndex,
    showSearch: internalProps.showSearch,
    filterOptionsValue: internalProps.filterOptionsValue,
    displayValue: internalProps.displayValue,
    selection: internalProps.selection,
    filteredOptions: internalProps.filteredOptions,
    emptySelectValue: internalProps.emptySelectValue
  }
}

interface ExternalProps<
  T extends ValueType = ValueType,
  M extends boolean = boolean,
  V = M extends true ? T[] : T
> extends SelectProps<T, M, V> {
  searchInputRef: React.Ref<HTMLInputElement>
  selectRef: React.Ref<HTMLInputElement>
  popperRef: React.Ref<PopperJs>
  native?: boolean
}

type InternalProps = {
  selectedIndexes: number[]
  isOpen: boolean
  canOpen: boolean
  open: () => void
  close: () => void
  onFocus: () => void
  highlightedIndex: number
  closeOnEnter: boolean
  onSelect: (event: React.SyntheticEvent, option: Option | null) => void
  setHighlightedIndex: (index: number) => void
  onChange: (newValue: string) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  showSearch: boolean
  filterOptionsValue: string
  displayValue: string
  selection: Selection
  filteredOptions: Option[]
  emptySelectValue: string | string[]
}

const useInternalProps = <T extends ValueType, M extends boolean = false>(
  props: ExternalProps<T, M>
): InternalProps => {
  const {
    selectRef,
    getDisplayValue,
    options = [],
    disabled = false,
    onChange: externalOnChange,
    onBlur: externalOnBlur,
    multiple,
    value,
    searchThreshold,
    onSearchChange,
    name
  } = props

  const [selectedOptions, setSelectedOptions] = useState(
    getSelectedOptions(options, value)
  )
  const selection = useMemo(
    () =>
      getSelection(
        removeDuplicatedOptions([...options, ...selectedOptions]),
        value
      ),
    [options, selectedOptions, value]
  )
  const [displayValue, setDisplayValue] = useState(
    selection.display(getDisplayValue!)
  )
  const [filterOptionsValue, setFilterOptionsValue] = useState(
    EMPTY_INPUT_VALUE
  )
  const filteredOptions = useMemo(
    () =>
      options.filter(option =>
        isSubstring(filterOptionsValue, getDisplayValue!(option))
      ),
    [options, filterOptionsValue, getDisplayValue]
  )
  const selectedIndexes = useMemo(
    () =>
      options.reduce(
        (selected: number[], option: Option, index: number) =>
          selection.isOptionSelected(option) ? [...selected, index] : selected,
        []
      ),
    [options, selection]
  )
  const emptySelectValue: string | string[] = useMemo(
    () => (multiple ? [] : ''),
    [multiple]
  )
  const showSearch = options.length >= searchThreshold!
  const [isOpen, setOpen] = useState<boolean>(false)
  const canOpen = !isOpen && !disabled
  const [highlightedIndex, setHighlightedIndex] = useHighlightedIndex({
    selectedIndexes,
    isOpen
  })

  useEffect(() => {
    const newSelect = getSelection(
      removeDuplicatedOptions([...options, ...selectedOptions]),
      value
    )

    setDisplayValue(newSelect.display(getDisplayValue!))
    setSelectedOptions(getSelectedOptions(options, value))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options, getDisplayValue])

  const close = useCallback(() => {
    setOpen(false)
  }, [])
  const open = useCallback(() => {
    setOpen(true)
  }, [])

  const fireOnChangeEvent = useCallback(
    ({ event, value }: { event: any; value: ValueType | ValueType[] }) => {
      event.persist()
      event.target = { value, name }
      externalOnChange?.(event)
    },
    [name, externalOnChange]
  )
  const internalOnFocus = () => {
    if (!isOpen) {
      setFilterOptionsValue(EMPTY_INPUT_VALUE)
    }
  }
  const internalOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!multiple) {
      const hasValue = displayValue !== EMPTY_INPUT_VALUE
      const isInputCleaned = !hasValue && !isEmpty(value)

      if (isInputCleaned) {
        fireOnChangeEvent({ event, value: EMPTY_INPUT_VALUE })
        setDisplayValue(EMPTY_INPUT_VALUE)
      } else {
        const select = getSelection(
          removeDuplicatedOptions([...options, ...selectedOptions]),
          value
        )

        setDisplayValue(select.display(getDisplayValue!))
      }
    }

    setFilterOptionsValue(EMPTY_INPUT_VALUE)
    externalOnBlur!(event)
  }
  const internalOnChange = (newValue: string) => {
    onSearchChange?.(newValue)
    setFilterOptionsValue(newValue)
  }
  const toggleMultipleSelectValue = (value: ValueType[], option: Option) => {
    const isInSelectedValues = isOptionInSelectedValues(option, value)

    if (isInSelectedValues) {
      return value!.filter(value => value !== option.value)
    }

    return [...value, String(option.value)]
  }
  const internalOnSelect = useCallback(
    (event: React.SyntheticEvent, option: Option | null) => {
      let newValue: ValueType | ValueType[]

      if (option === null) {
        newValue = emptySelectValue
      } else if (multiple) {
        newValue = toggleMultipleSelectValue(
          (value ?? []) as ValueType[],
          option
        )
      } else {
        newValue = option.value
      }

      setSelectedOptions(
        options.filter(option =>
          Array.isArray(newValue)
            ? isOptionInSelectedValues(option, newValue)
            : newValue === String(option.value)
        )
      )

      fireOnChangeEvent({ event, value: newValue })
      setFilterOptionsValue(EMPTY_INPUT_VALUE)

      focusRef(selectRef)
    },
    [
      options,
      emptySelectValue,
      setFilterOptionsValue,
      fireOnChangeEvent,
      multiple,
      value,
      selectRef
    ]
  )

  return {
    ...props,
    filteredOptions,
    selectedIndexes,
    isOpen,
    canOpen,
    open,
    close,
    onFocus: internalOnFocus,
    highlightedIndex,
    closeOnEnter: !multiple,
    onSelect: internalOnSelect,
    setHighlightedIndex,
    onChange: internalOnChange,
    onBlur: internalOnBlur,
    showSearch,
    filterOptionsValue,
    displayValue,
    selection,
    emptySelectValue
  }
}

const focusRef = <T extends HTMLElement>(ref: React.Ref<T>) => {
  if (typeof ref === 'object' && ref?.current) {
    ref.current.focus()
  }
}

const useHighlightedIndex = ({
  selectedIndexes,
  isOpen
}: Pick<InternalProps, 'selectedIndexes' | 'isOpen'>) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(selectedIndexes.length === 1 ? selectedIndexes[0] : 0)
    }
  }, [isOpen, selectedIndexes])

  return [highlightedIndex, setHighlightedIndex] as [
    number,
    (value: number) => void
  ]
}

const useClickHandler = ({ canOpen, open, onFocus }: InternalProps) =>
  useCallback(() => {
    if (canOpen) {
      onFocus()
      open()
    }
  }, [canOpen, open, onFocus])

const useEnterOrSpaceKeyDownHandler = ({
  canOpen,
  open,
  filteredOptions,
  highlightedIndex,
  closeOnEnter,
  onSelect
}: InternalProps) =>
  useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      if (canOpen) {
        open()

        return
      }

      const item = filteredOptions[highlightedIndex]

      if (item == null) {
        return
      }

      if (closeOnEnter) {
        close()
      }

      onSelect?.(event, item)
    },
    [canOpen, open, filteredOptions, highlightedIndex, closeOnEnter, onSelect]
  )

const useArrowsKeyDownHandler = ({
  isOpen,
  highlightedIndex,
  filteredOptions,
  setHighlightedIndex,
  open
}: InternalProps) =>
  useCallback(
    (key: string, event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      if (isOpen) {
        setHighlightedIndex(
          getNextWrappingIndex(
            key === 'ArrowDown' ? 1 : -1,
            highlightedIndex,
            filteredOptions.length
          )
        )
      } else {
        open()
      }
    },
    [isOpen, highlightedIndex, filteredOptions, setHighlightedIndex, open]
  )

const useSelectBlurHandler = ({
  onBlur,
  popperRef,
  close
}: InternalProps & Pick<ExternalProps, 'popperRef'>) =>
  useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!isRelatedTargetInsidePopper(event, popperRef)) {
        onBlur(event)
        close()
      }
    },
    [onBlur, popperRef, close]
  )

const useSearchBlurHandler = ({
  selectRef,
  popperRef,
  close
}: InternalProps & Pick<ExternalProps, 'popperRef' | 'selectRef'>) =>
  useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (isRelatedTargetInsidePopper(event, popperRef)) {
        focusRef(selectRef)
      } else {
        close()
      }
    },
    [selectRef, popperRef, close]
  )

const useEscapeKeyDownHandler = ({ close }: InternalProps) =>
  useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      close()
    },
    [close]
  )

const useResetClickHandler = ({ close, onSelect }: InternalProps) =>
  useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      // keep select options closed
      event.stopPropagation()

      close()

      onSelect?.(event, null)
    },
    [close, onSelect]
  )

const useSearchChangeHandler = ({ onChange }: InternalProps) =>
  useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value)
    },
    [onChange]
  )

const useItemOnMouseDownHandler = () =>
  useCallback((event: React.MouseEvent) => {
    // This prevents the activeElement from being changed
    // to the item so it can remain with the current activeElement
    // which is a more common use case.
    event.preventDefault()
  }, [])

const isRelatedTargetInsidePopper = (
  event: React.FocusEvent,
  popperRef: ExternalProps['popperRef']
) =>
  typeof popperRef === 'object' &&
  popperRef?.current &&
  popperRef.current.popper.contains(event.relatedTarget as Node)

export default useSelect

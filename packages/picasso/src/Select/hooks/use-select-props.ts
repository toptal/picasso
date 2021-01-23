/* eslint-disable max-lines */
import { KeyboardEvent, ChangeEvent, useCallback, HTMLAttributes } from 'react'
import PopperJs from 'popper.js'

import { Option, ItemProps, FocusEventType, ValueType } from '../types'
import {
  isOptionInSelectedValues,
  getSelection,
  removeDuplicatedOptions,
  isEmpty,
  getNextWrappingIndex,
  normalizeArrowKey
} from './utils'
import { Props as SelectProps } from '../Select'
import { UseSelectStateOutput } from './use-select-state'

export const EMPTY_INPUT_VALUE = ''

export interface Props<
  T extends ValueType = ValueType,
  M extends boolean = boolean,
  V = M extends true ? T[] : T
> {
  searchInputRef?: React.Ref<HTMLInputElement>
  selectRef: React.Ref<HTMLInputElement>
  popperRef?: React.Ref<PopperJs>
  selectProps: SelectProps<T, M, V>
  native?: boolean
  selectState: UseSelectStateOutput
}

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
}

const useSelectProps = <T extends ValueType, M extends boolean = false>(
  props: Props<T, M>
): UseSelectOutput => {
  const handleFocus = useFocusHandler(props)
  const handleClick = useClickHandler(props)
  const handleSelectBlur = useSelectBlurHandler(props)
  const handleSelect = useSelectHandler(props)
  const handleSearchBlur = useSearchBlurHandler(props)
  const handleEscapeKeyDown = useEscapeKeyDownHandler(props)
  const handleEnterOrSpaceKeyDown = useEnterOrSpaceKeyDownHandler({
    ...props,
    handleSelect
  })
  const handleArrowsKeyDown = useArrowsKeyDownHandler(props)
  const handleResetClick = useResetClickHandler({
    ...props,
    handleSelect
  })
  const handleSearchChange = useSearchChangeHandler(props)
  const handleItemOnMouseDown = useItemOnMouseDownHandler()
  const handleItemOnMouseEnter = useItemOnMouseEnter(props)
  const handleItemOnClick = useItemOnClick({ ...props, handleSelect })
  const handleSearchKeyDown = useSearchKeyDownHandler({
    ...props,
    handleArrowsKeyDown,
    handleEnterOrSpaceKeyDown,
    handleEscapeKeyDown
  })
  const handleSelectKeyDown = useSelectKeyDownHandler({
    ...props,
    handleArrowsKeyDown,
    handleEnterOrSpaceKeyDown,
    handleEscapeKeyDown
  })

  const getItemProps = (index: number, item: Option): ItemProps => ({
    role: 'option',
    'aria-selected': props.selectState.highlightedIndex === index,
    onMouseEnter: () => handleItemOnMouseEnter(index),
    onMouseDown: handleItemOnMouseDown,
    close,
    onItemSelect: handleSelect,
    onClick: (event: React.MouseEvent) => handleItemOnClick(event, item)
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
    getSearchInputProps
  }
}

const focusRef = <T extends HTMLElement>(ref: React.Ref<T> | undefined) => {
  if (typeof ref === 'object' && ref?.current) {
    ref.current.focus()
  }
}

const toggleMultipleSelectValue = (value: ValueType[], option: Option) => {
  const isInSelectedValues = isOptionInSelectedValues(option, value)

  if (isInSelectedValues) {
    return value!.filter(value => value !== option.value)
  }

  return [...value, String(option.value)]
}

const useSelectHandler = <T extends ValueType, M extends boolean = false>({
  selectState: { emptySelectValue, setSelectedOptions, setFilterOptionsValue },
  selectProps: { multiple, value, options, name, onChange },
  selectRef
}: Props<T, M>) =>
  useCallback(
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

      fireOnChangeEvent({ event, value: newValue, name, onChange })
      setFilterOptionsValue(EMPTY_INPUT_VALUE)

      focusRef(selectRef)
    },
    [
      name,
      onChange,
      options,
      emptySelectValue,
      setFilterOptionsValue,
      multiple,
      value,
      selectRef,
      setSelectedOptions
    ]
  )

const useSearchKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectRef,
  selectProps: { onKeyDown },
  handleArrowsKeyDown,
  handleEnterOrSpaceKeyDown,
  handleEscapeKeyDown
}: Props<T, M> & {
  handleArrowsKeyDown: ReturnType<typeof useArrowsKeyDownHandler>
  handleEnterOrSpaceKeyDown: ReturnType<typeof useEnterOrSpaceKeyDownHandler>
  handleEscapeKeyDown: ReturnType<typeof useEscapeKeyDownHandler>
}) =>
  // eslint-disable-next-line complexity
  useCallback(
    // eslint-disable-next-line complexity
    (event: KeyboardEvent<HTMLInputElement>) => {
      const key = normalizeArrowKey(event)

      if (key === 'Tab') {
        focusRef(selectRef)
        event.preventDefault()
      } else if (key === 'ArrowUp' || key === 'ArrowDown') {
        handleArrowsKeyDown(key, event)
      } else if (key === 'Enter') {
        handleEnterOrSpaceKeyDown(event)
      } else if (key === 'Escape') {
        handleEscapeKeyDown(event)
      }

      onKeyDown?.(event)
    },
    [
      selectRef,
      onKeyDown,
      handleArrowsKeyDown,
      handleEnterOrSpaceKeyDown,
      handleEscapeKeyDown
    ]
  )

const useSelectKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  native,
  selectProps: { onKeyDown },
  searchInputRef,
  selectState: { isOpen, showSearch },
  handleArrowsKeyDown,
  handleEnterOrSpaceKeyDown,
  handleEscapeKeyDown
}: Props<T, M> & {
  handleArrowsKeyDown: ReturnType<typeof useArrowsKeyDownHandler>
  handleEnterOrSpaceKeyDown: ReturnType<typeof useEnterOrSpaceKeyDownHandler>
  handleEscapeKeyDown: ReturnType<typeof useEscapeKeyDownHandler>
}) =>
  // eslint-disable-next-line complexity
  useCallback(
    // eslint-disable-next-line complexity
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (native) {
        onKeyDown?.(event)

        // for the native select we don't want to prevent defaults for the event
        // and don't need any manual operations for keydown event
        return
      }

      const isValidInputValue =
        Boolean(event.key.match(/^[A-z\d]$/)) || event.key === 'Backspace'

      if (isValidInputValue) {
        focusRef(searchInputRef)
      }

      const key = normalizeArrowKey(event)

      if (key === 'Tab' && isOpen && showSearch) {
        event.preventDefault()
        focusRef(searchInputRef)
      } else if (key === 'ArrowUp' || key === 'ArrowDown') {
        handleArrowsKeyDown(key, event)
      } else if (key === 'Enter' || key === ' ') {
        handleEnterOrSpaceKeyDown(event)
      } else if (key === 'Escape') {
        handleEscapeKeyDown(event)
      }

      onKeyDown?.(event)
    },
    [
      native,
      onKeyDown,
      searchInputRef,
      isOpen,
      showSearch,
      handleArrowsKeyDown,
      handleEnterOrSpaceKeyDown,
      handleEscapeKeyDown
    ]
  )

const useFocusHandler = <T extends ValueType, M extends boolean = false>({
  selectState: { isOpen, setFilterOptionsValue }
}: Props<T, M>) =>
  useCallback(() => {
    if (!isOpen) {
      setFilterOptionsValue(EMPTY_INPUT_VALUE)
    }
  }, [isOpen, setFilterOptionsValue])

const useClickHandler = <T extends ValueType, M extends boolean = false>({
  selectState: { canOpen, open, setFilterOptionsValue }
}: Props<T, M>) =>
  useCallback(() => {
    if (canOpen) {
      setFilterOptionsValue(EMPTY_INPUT_VALUE)
      open()
    }
  }, [canOpen, open, setFilterOptionsValue])

const useEnterOrSpaceKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: {
    canOpen,
    open,
    filteredOptions,
    highlightedIndex,
    closeOnEnter
  },
  handleSelect
}: Props<T, M> & {
  handleSelect: ReturnType<typeof useSelectHandler>
}) =>
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

      handleSelect(event, item)
    },
    [
      canOpen,
      open,
      filteredOptions,
      highlightedIndex,
      closeOnEnter,
      handleSelect
    ]
  )

const useArrowsKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: {
    isOpen,
    highlightedIndex,
    filteredOptions,
    setHighlightedIndex,
    open
  }
}: Props<T, M>) =>
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

const fireOnChangeEvent = <T extends ValueType, M extends boolean = false>({
  event,
  value: eventValue,
  name,
  onChange
}: {
  event: any
  value: ValueType | ValueType[]
  name?: string
  onChange: Props<T, M>['selectProps']['onChange']
}) => {
  event.persist()
  event.target = { value: eventValue, name }
  onChange?.(event)
}

const useSelectBlurHandler = <T extends ValueType, M extends boolean = false>({
  popperRef,
  selectState: {
    close,
    displayValue,
    setDisplayValue,
    selectedOptions,
    setFilterOptionsValue
  },
  selectProps: {
    value,
    multiple,
    options,
    onBlur,
    name,
    onChange,
    getDisplayValue
  }
}: Props<T, M>) =>
  useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!multiple) {
        const hasValue = displayValue !== EMPTY_INPUT_VALUE
        const isInputCleaned = !hasValue && !isEmpty(value)

        if (isInputCleaned) {
          fireOnChangeEvent({ event, value: EMPTY_INPUT_VALUE, name, onChange })
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

      if (!isRelatedTargetInsidePopper(event, popperRef)) {
        close()
      }

      onBlur?.(event)
    },
    [
      name,
      onChange,
      onBlur,
      popperRef,
      close,
      displayValue,
      multiple,
      value,
      setDisplayValue,
      selectedOptions,
      options,
      getDisplayValue,
      setFilterOptionsValue
    ]
  )

const useSearchBlurHandler = <T extends ValueType, M extends boolean = false>({
  selectRef,
  popperRef,
  selectState: { close }
}: Props<T, M>) =>
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

const useEscapeKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: { close }
}: Props<T, M>) =>
  useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      close()
    },
    [close]
  )

const useResetClickHandler = <T extends ValueType, M extends boolean = false>({
  selectState: { close },
  handleSelect
}: Props<T, M> & {
  handleSelect: ReturnType<typeof useSelectHandler>
}) =>
  useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      // keep select options closed
      event.stopPropagation()

      close()

      handleSelect(event, null)
    },
    [close, handleSelect]
  )

const useSearchChangeHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: { setFilterOptionsValue },
  selectProps: { onSearchChange }
}: Props<T, M>) =>
  useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearchChange?.(event.target.value)
      setFilterOptionsValue(event.target.value)
    },
    [onSearchChange, setFilterOptionsValue]
  )

const useItemOnMouseDownHandler = () =>
  useCallback((event: React.MouseEvent) => {
    // This prevents the activeElement from being changed
    // to the item so it can remain with the current activeElement
    // which is a more common use case.
    event.preventDefault()
  }, [])

const useItemOnMouseEnter = <T extends ValueType, M extends boolean = false>({
  selectState: { highlightedIndex, setHighlightedIndex }
}: Props<T, M>) =>
  useCallback(
    (index: number) => {
      if (index === highlightedIndex) {
        return
      }

      setHighlightedIndex(index)
    },
    [highlightedIndex, setHighlightedIndex]
  )

const useItemOnClick = <T extends ValueType, M extends boolean = false>({
  selectState: { close },
  handleSelect
}: Props<T, M> & {
  handleSelect: ReturnType<typeof useSelectHandler>
}) =>
  useCallback(
    (event: React.MouseEvent, item: Option) => {
      close()

      handleSelect(event, item)
    },
    [close, handleSelect]
  )

const isRelatedTargetInsidePopper = (
  event: React.FocusEvent,
  popperRef: Props['popperRef']
) =>
  typeof popperRef === 'object' &&
  popperRef?.current &&
  popperRef.current.popper.contains(event.relatedTarget as Node)

export default useSelectProps

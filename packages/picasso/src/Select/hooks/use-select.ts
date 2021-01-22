/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
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
import useSelectState, { UseSelectStateOutput } from './use-select-state'

export const EMPTY_INPUT_VALUE = ''

type GetRootProps = () => {
  onFocus: FocusEventType
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  onBlur: FocusEventType
}
type GetInputProps = () => Partial<HTMLAttributes<HTMLInputElement>>
type GetSearchInputProps = () => Partial<HTMLAttributes<HTMLInputElement>>

interface UseSelectOutput extends UseSelectStateOutput {
  getItemProps: (index: number, item: Option) => ItemProps
  getRootProps: GetRootProps
  getInputProps: GetInputProps
  getSearchInputProps: GetSearchInputProps
}

const useSelect = <T extends ValueType, M extends boolean = false>(
  props: UseSelectProps<T, M>
): UseSelectOutput => {
  const selectState = useSelectState(props)

  const handleFocus = useFocusHandler(selectState)
  const handleClick = useClickHandler(selectState)
  const handleSelectBlur = useSelectBlurHandler({
    ...selectState,
    onBlur: props.onBlur,
    popperRef: props.popperRef,
    multiple: props.multiple,
    value: props.value,
    options: props.options,
    getDisplayValue: props.getDisplayValue,
    name: props.name,
    onChange: props.onChange as any
  })
  const handleSelect = useSelectHandler({
    ...selectState,
    multiple: props.multiple,
    value: props.value,
    options: props.options,
    selectRef: props.selectRef,
    name: props.name,
    onChange: props.onChange as any
  })
  const handleSearchBlur = useSearchBlurHandler({
    ...selectState,
    popperRef: props.popperRef,
    selectRef: props.selectRef
  })
  const handleEscapeKeyDown = useEscapeKeyDownHandler(selectState)
  const handleEnterOrSpaceKeyDown = useEnterOrSpaceKeyDownHandler({
    ...selectState,
    handleSelect
  })
  const handleArrowsKeyDown = useArrowsKeyDownHandler(selectState)
  const handleResetClick = useResetClickHandler({
    ...selectState,
    handleSelect
  })
  const handleSearchChange = useSearchChangeHandler(selectState)
  const handleItemOnMouseDown = useItemOnMouseDownHandler()
  const handleItemOnMouseEnter = useItemOnMouseEnter(selectState)
  const handleItemOnClick = useItemOnClick({ ...selectState, handleSelect })
  const handleSearchKeyDown = useSearchKeyDownHandler({
    selectRef: props.selectRef,
    onKeyDown: props.onKeyDown,
    handleArrowsKeyDown,
    handleEnterOrSpaceKeyDown,
    handleEscapeKeyDown
  })
  const handleSelectKeyDown = useSelectKeyDownHandler({
    ...selectState,
    native: props.native,
    onKeyDown: props.onKeyDown,
    searchInputRef: props.searchInputRef,
    handleArrowsKeyDown,
    handleEnterOrSpaceKeyDown,
    handleEscapeKeyDown
  })

  const getItemProps = (index: number, item: Option): ItemProps => ({
    role: 'option',
    'aria-selected': selectState.highlightedIndex === index,
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
    ...selectState,
    getItemProps,
    getRootProps,
    getInputProps,
    getSearchInputProps
  }
}

export interface UseSelectProps<
  T extends ValueType = ValueType,
  M extends boolean = boolean,
  V = M extends true ? T[] : T
> extends SelectProps<T, M, V> {
  searchInputRef: React.Ref<HTMLInputElement>
  selectRef: React.Ref<HTMLInputElement>
  popperRef: React.Ref<PopperJs>
  native?: boolean
}

const focusRef = <T extends HTMLElement>(ref: React.Ref<T>) => {
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

const useSelectHandler = ({
  emptySelectValue,
  multiple,
  value,
  setSelectedOptions,
  options,
  setFilterOptionsValue,
  selectRef,
  name,
  onChange
}: UseSelectStateOutput &
  Pick<
    UseSelectProps,
    'multiple' | 'value' | 'options' | 'selectRef' | 'name' | 'onChange'
  >) =>
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

const useSearchKeyDownHandler = ({
  selectRef,
  onKeyDown,
  handleArrowsKeyDown,
  handleEnterOrSpaceKeyDown,
  handleEscapeKeyDown
}: Pick<UseSelectProps, 'selectRef' | 'onKeyDown'> & {
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

const useSelectKeyDownHandler = ({
  native,
  onKeyDown,
  searchInputRef,
  isOpen,
  showSearch,
  handleArrowsKeyDown,
  handleEnterOrSpaceKeyDown,
  handleEscapeKeyDown
}: UseSelectStateOutput &
  Pick<
    UseSelectProps,
    'onKeyDown' | 'native' | 'onKeyDown' | 'searchInputRef'
  > & {
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

const useFocusHandler = ({
  isOpen,
  setFilterOptionsValue
}: UseSelectStateOutput) =>
  useCallback(() => {
    if (!isOpen) {
      setFilterOptionsValue(EMPTY_INPUT_VALUE)
    }
  }, [isOpen, setFilterOptionsValue])

const useClickHandler = ({
  canOpen,
  open,
  setFilterOptionsValue
}: UseSelectStateOutput) =>
  useCallback(() => {
    if (canOpen) {
      setFilterOptionsValue(EMPTY_INPUT_VALUE)
      open()
    }
  }, [canOpen, open, setFilterOptionsValue])

const useEnterOrSpaceKeyDownHandler = ({
  canOpen,
  open,
  filteredOptions,
  highlightedIndex,
  closeOnEnter,
  handleSelect
}: UseSelectStateOutput & {
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

const useArrowsKeyDownHandler = ({
  isOpen,
  highlightedIndex,
  filteredOptions,
  setHighlightedIndex,
  open
}: UseSelectStateOutput) =>
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

const fireOnChangeEvent = ({
  event,
  value: eventValue,
  name,
  onChange
}: {
  event: any
  value: ValueType | ValueType[]
  name?: string
  onChange: UseSelectProps['onChange']
}) => {
  event.persist()
  event.target = { value: eventValue, name }
  onChange?.(event)
}

const useSelectBlurHandler = ({
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
  setFilterOptionsValue,
  name,
  onChange
}: UseSelectStateOutput &
  Pick<
    UseSelectProps,
    | 'popperRef'
    | 'onBlur'
    | 'onChange'
    | 'multiple'
    | 'value'
    | 'options'
    | 'getDisplayValue'
    | 'name'
  >) =>
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

const useSearchBlurHandler = ({
  selectRef,
  popperRef,
  close
}: UseSelectStateOutput & Pick<UseSelectProps, 'popperRef' | 'selectRef'>) =>
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

const useEscapeKeyDownHandler = ({ close }: UseSelectStateOutput) =>
  useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      close()
    },
    [close]
  )

const useResetClickHandler = ({
  close,
  handleSelect
}: UseSelectStateOutput & {
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

const useSearchChangeHandler = ({
  setFilterOptionsValue,
  onSearchChange
}: UseSelectStateOutput & Pick<UseSelectProps, 'onSearchChange'>) =>
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

const useItemOnMouseEnter = ({
  highlightedIndex,
  setHighlightedIndex
}: UseSelectStateOutput) =>
  useCallback(
    (index: number) => {
      if (index === highlightedIndex) {
        return
      }

      setHighlightedIndex(index)
    },
    [highlightedIndex, setHighlightedIndex]
  )

const useItemOnClick = ({
  close,
  handleSelect
}: UseSelectStateOutput & {
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
  popperRef: UseSelectProps['popperRef']
) =>
  typeof popperRef === 'object' &&
  popperRef?.current &&
  popperRef.current.popper.contains(event.relatedTarget as Node)

export default useSelect

import React, { useCallback, useState } from 'react'
import { Container } from '@toptal/picasso-container'
import { TagSelector as PicassoTagSelector } from '@toptal/picasso-tagselector'
import { useDebouncedCallback } from 'use-debounce'
import type { Item } from '@toptal/picasso-tagselector'

import { validateValueEditor } from '../utils'
import type {
  BaseVersatileSelectorProps,
  ValueEditorValidationProps,
} from '../types/query-builder'

interface Props extends BaseVersatileSelectorProps, ValueEditorValidationProps {
  fullWidth?: boolean
  valueEditorTestId?: string
}

const EMPTY_INPUT_VALUE = ''
const NO_OPTIONS_TEXT = 'No matches found'

export const AutoComplete = ({
  handleOnChange,
  value,
  disabled,
  fullWidth = false,
  fieldData,
  validation,
  touched,
  handleTouched,
  valueEditorTestId,
}: Props) => {
  const hasError = validateValueEditor({
    validation,
    touched,
  })

  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)
  const [autoCompleteValue, setAutoCompleteValue] = useState<Item[]>(
    (value || []) as Item[]
  )

  const generateOptions = useCallback((): Item[] => {
    if (inputValue === EMPTY_INPUT_VALUE || !fieldData?.options) {
      return []
    }

    return fieldData.options.map((item: Item) => ({
      value: item.name,
      text: item.label,
    })) as Item[]
  }, [fieldData?.options, inputValue])

  const handleChangeDebounced = useDebouncedCallback((searchterm: string) => {
    fieldData?.onSearch(searchterm)
  }, 1000)

  const handleInputChange = useCallback(
    (searchterm: string) => {
      setInputValue(searchterm)

      handleChangeDebounced(searchterm)
    },
    [handleChangeDebounced]
  )

  return (
    // TODO(tokens): [PF-1994] 12.875rem collapsed field width is off the Picasso spacing scale
    <Container
      className={
        fullWidth
          ? 'grow [background:none]'
          : 'w-[12.875rem] shrink-0 bg-transparent'
      }
    >
      <PicassoTagSelector
        width='full'
        placeholder='Start typing to search'
        disabled={disabled}
        noOptionsText={
          inputValue === EMPTY_INPUT_VALUE ? 'Type to search' : NO_OPTIONS_TEXT
        }
        options={generateOptions()}
        loading={fieldData?.loading}
        value={autoCompleteValue}
        inputValue={inputValue}
        onChange={selectedValues => {
          setAutoCompleteValue(selectedValues)
          handleOnChange(selectedValues)
        }}
        onInputChange={newInputValue => {
          handleInputChange(newInputValue)
        }}
        onBlur={() => handleTouched?.(true)}
        status={hasError ? 'error' : undefined}
        data-testid={valueEditorTestId}
      />
    </Container>
  )
}

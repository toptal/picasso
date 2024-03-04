import React, { useCallback, useState } from 'react'
import { Container, TagSelector as PicassoTagSelector } from '@toptal/picasso'
import { useDebouncedCallback } from 'use-debounce'
import type { TagSelectorItem as Item } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { validateValueEditor } from '../utils'
import type {
  BaseVersatileSelectorProps,
  ValueEditorValidationProps,
} from '../types/query-builder'
import styles from './styles'

interface Props extends BaseVersatileSelectorProps, ValueEditorValidationProps {
  fullWidth?: boolean
  valueEditorTestId?: string
}

const EMPTY_INPUT_VALUE = ''
const NO_OPTIONS_TEXT = 'No matches found'

const useStyles = makeStyles(styles)

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
  const classes = useStyles()

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
    <Container
      className={cx({
        [classes.fullWidth]: fullWidth,
        [classes.root]: !fullWidth,
      })}
      style={{ background: fullWidth ? 'none' : 'transparent' }}
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

import React from 'react'
import type { ValueEditorType } from 'react-querybuilder'

import { Select } from '../Select/Select'
import { MultiSelect } from '../MultiSelect/MultiSelect'
import { AutoComplete } from '../AutoComplete/AutoComplete'
import RangeInput from '../RangeInput/RangeInput'
import TextInput from '../TextInput/TextInput'
import useHandleTouched from '../../services/use-handle-touched'
import BooleanInput from '../BooleanInput/BooleanInput'
import type { BaseValueEditorProps } from '../../types/query-builder'

type CustomValueEditorType =
  | 'autocomplete'
  | 'range'
  | 'boolean'
  | ValueEditorType

export interface QueryBuilderValueEditorProps
  extends Omit<BaseValueEditorProps, 'type'> {
  type?: CustomValueEditorType
}

export const ValueEditor = ({
  value,
  handleOnChange,
  inputType,
  className,
  type = 'text',
  disabled,
  path,
  level,
  values = [],
  field,
  fieldData,
  validation,
  context = {},
}: QueryBuilderValueEditorProps) => {
  const { touched, handleTouched } = useHandleTouched({
    submitButtonClicked: context?.submitButtonClicked,
  })

  switch (type) {
    case 'multiselect':
      return (
        <MultiSelect
          // css={S.valueEditor}
          disabled={disabled}
          options={values}
          value={value}
          handleOnChange={handleOnChange}
          className={className}
          path={path}
          level={level}
          validation={validation}
          handleTouched={handleTouched}
          touched={touched}
          fieldData={fieldData}
        />
      )
    case 'select':
      return (
        <Select
          // css={S.valueEditor}
          disabled={disabled}
          options={values}
          value={value}
          handleOnChange={handleOnChange}
          className={className}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
          fieldData={fieldData}
        />
      )
    case 'autocomplete':
      return (
        <AutoComplete
          // css={S.valueEditor}
          fullWidth
          disabled={disabled}
          options={values}
          value={value}
          handleOnChange={handleOnChange}
          className={className}
          path={path}
          level={level}
          field={field}
          fieldData={fieldData}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
        />
      )
    case 'range':
      return (
        <RangeInput
          value={value}
          onChange={handleOnChange}
          min={fieldData.min}
          max={fieldData.max}
          step={fieldData.step}
          icon={fieldData.icon}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
        />
      )
    case 'boolean':
      return (
        <BooleanInput
          // css={S.valueEditor}
          disabled={disabled}
          value={value}
          handleOnChange={handleOnChange}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
          fieldData={fieldData}
        />
      )
    default:
      return (
        <TextInput
          // css={S.valueEditor}
          value={value}
          onChange={handleOnChange}
          className={className}
          inputType={inputType || undefined}
          disabled={disabled}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
        />
      )
  }
}

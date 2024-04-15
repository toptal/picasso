import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { Field as QueryBuilderField } from 'react-querybuilder'

import { Select } from '../Select'
import { MultiSelect } from '../MultiSelect'
import { AutoComplete } from '../AutoComplete'
import { RangeInput } from '../RangeInput'
import { TextInput } from '../TextInput'
import { useHandleTouched } from '../utils'
import { BooleanInput } from '../BooleanInput'
import type {
  AutoCompleteField,
  BaseValueEditorProps,
  BasicField,
  BooleanField,
  MultiSelectField,
  RangeField,
  SelectField,
} from '../types/query-builder'
import styles from './styles'

export type QueryBuilderValueEditorProps =
  | BaseValueEditorProps<AutoCompleteField>
  | BaseValueEditorProps<MultiSelectField>
  | BaseValueEditorProps<RangeField>
  | BaseValueEditorProps<BooleanField>
  | BaseValueEditorProps<SelectField>
  | BaseValueEditorProps<BasicField>
  | (Omit<BaseValueEditorProps<QueryBuilderField>, 'type'> & {
      type: Exclude<
        BaseValueEditorProps<QueryBuilderField>['type'],
        'multiselect' | 'range' | 'select'
      >
    })

const useStyles = makeStyles(styles)

export const ValueEditor = ({
  value,
  handleOnChange,
  inputType,
  className,
  disabled,
  path,
  level,
  values = [],
  field,
  fieldData,
  type,
  validation,
  context = {},
}: QueryBuilderValueEditorProps) => {
  const classes = useStyles()

  const valueEditorTestId = context?.testIds?.valueEditor

  const { touched, handleTouched } = useHandleTouched({
    submitButtonClicked: context?.submitButtonClicked,
  })

  switch (type) {
    case 'multiselect':
      return (
        <MultiSelect
          className={cx(className, classes.root)}
          disabled={disabled}
          options={values}
          value={value}
          handleOnChange={handleOnChange}
          path={path}
          level={level}
          validation={validation}
          handleTouched={handleTouched}
          touched={touched}
          fieldData={fieldData}
          valueEditorTestId={valueEditorTestId}
        />
      )
    case 'select':
      return (
        <Select
          className={cx(className, classes.root)}
          disabled={disabled}
          options={values}
          value={value}
          handleOnChange={handleOnChange}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
          fieldData={fieldData}
          valueEditorTestId={valueEditorTestId}
        />
      )
    case 'autocomplete':
      return (
        <AutoComplete
          className={cx(className, classes.root)}
          fullWidth
          disabled={disabled}
          options={values}
          value={value}
          handleOnChange={handleOnChange}
          path={path}
          level={level}
          field={field}
          fieldData={fieldData}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
          valueEditorTestId={valueEditorTestId}
        />
      )
    case 'range':
      return (
        <RangeInput
          value={value}
          handleOnChange={handleOnChange}
          fieldData={fieldData}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
          valueEditorTestId={valueEditorTestId}
        />
      )
    case 'boolean':
      return (
        <BooleanInput
          className={classes.root}
          disabled={disabled}
          value={value}
          handleOnChange={handleOnChange}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
          fieldData={fieldData}
          valueEditorTestId={valueEditorTestId}
        />
      )
    default:
      return (
        <TextInput
          className={cx(className, classes.root)}
          value={value}
          handleOnChange={handleOnChange}
          inputType={inputType || undefined}
          disabled={disabled}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
          valueEditorTestId={valueEditorTestId}
        />
      )
  }
}

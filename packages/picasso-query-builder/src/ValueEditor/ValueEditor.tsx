import React from 'react'
import type { ValueEditorType } from 'react-querybuilder'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Select } from '../Select'
import { MultiSelect } from '../MultiSelect'
import { AutoComplete } from '../AutoComplete'
import { RangeInput } from '../RangeInput'
import { TextInput } from '../TextInput'
import { useHandleTouched } from '../utils'
import { BooleanInput } from '../BooleanInput'
import type { BaseValueEditorProps } from '../types/query-builder'
import styles from './styles'

type CustomValueEditorType =
  | 'autocomplete'
  | 'range'
  | 'boolean'
  | ValueEditorType

export interface QueryBuilderValueEditorProps
  extends Omit<BaseValueEditorProps, 'type'> {
  type?: CustomValueEditorType
}

const useStyles = makeStyles(styles)

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
          min={fieldData.min}
          max={fieldData.max}
          step={fieldData.step}
          icon={fieldData.icon}
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

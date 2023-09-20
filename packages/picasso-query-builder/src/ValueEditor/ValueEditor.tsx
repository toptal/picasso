import React from 'react'
import type { ValueEditorType } from 'react-querybuilder'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Select } from '../Select/Select'
import { MultiSelect } from '../MultiSelect/MultiSelect'
import { AutoComplete } from '../AutoComplete/AutoComplete'
import RangeInput from '../RangeInput/RangeInput'
import TextInput from '../TextInput/TextInput'
import useHandleTouched from '../utils/use-handle-touched'
import BooleanInput from '../BooleanInput/BooleanInput'
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
          className={classes.root}
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
          className={cx(className, classes.root)}
          value={value}
          onChange={handleOnChange}
          inputType={inputType || undefined}
          disabled={disabled}
          handleTouched={handleTouched}
          touched={touched}
          validation={validation}
        />
      )
  }
}

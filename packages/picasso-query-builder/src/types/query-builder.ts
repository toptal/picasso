import type { ReactNode } from 'react'
import type {
  Field as QueryBuilderField,
  OperatorSelectorProps,
  ValidationResult,
  ValueEditorProps,
  VersatileSelectorProps,
} from 'react-querybuilder'

export interface RangeFieldOptions {
  min?: number
  max?: number
  step?: number
  icon?: ReactNode
}

export type RangeValue = {
  from?: number
  to?: number
}

type BaseQueryBuilderField = RemoveIndex<QueryBuilderField> & {
  hideOperator?: boolean
  disabled?: boolean
}

export interface BasicField
  extends Omit<BaseQueryBuilderField, 'valueEditorType'> {
  valueEditorType?: 'text' | 'number' | null
}

export interface SelectField
  extends Omit<BaseQueryBuilderField, 'valueEditorType'> {
  valueEditorType?: 'select'
  loading?: boolean
  onClick?: () => void
}

export interface RangeField
  extends Omit<BaseQueryBuilderField, 'valueEditorType'>,
    Partial<RangeFieldOptions> {
  valueEditorType?: 'range'
}

export interface BooleanField
  extends Omit<BaseQueryBuilderField, 'valueEditorType' | 'values'> {
  valueEditorType?: 'boolean'
}
export interface MultiSelectField
  extends Omit<BaseQueryBuilderField, 'valueEditorType'> {
  valueEditorType?: 'multiselect'
  enableReset?: boolean
  enableResetSearch?: boolean
  loading?: boolean
  onClick?: () => void
}

export interface AutoCompleteField
  extends Omit<BaseQueryBuilderField, 'valueEditorType'> {
  valueEditorType: 'autocomplete'
  /**
   * Callback for autocomplete input change
   *
   * @param {string} searchTerm Autocomplete input value
   * @returns {void}
   */
  onSearch: (searchTerm: string) => void
  /**
   * List of options (search results)
   */
  options: { label: string; name: string }[]
  loading: boolean
}

export type BaseValueEditorProps<FieldType extends Field = Field> = Omit<
  ValueEditorProps,
  'schema' | 'fieldData' | 'type'
> & {
  field: string
  fieldData: FieldType
  type?: FieldType['valueEditorType']
}

export type BaseVersatileSelectorProps<FieldType extends Field = Field> = Omit<
  VersatileSelectorProps,
  'schema' | 'fieldData'
> & {
  fieldData?: FieldType
}

export type BaseOperatorSelectorProps<FieldType extends Field = Field> = Omit<
  OperatorSelectorProps,
  'schema' | 'fieldData'
> & {
  fieldData?: FieldType
}

export type Field =
  | BasicField
  | SelectField
  | RangeField
  | AutoCompleteField
  | BooleanField
  | MultiSelectField
  | QueryBuilderField

export type QueryBuilderErrors = {
  [key: string]: ValidationResult | true
}

export type QueryBuilderContext = {
  removeGroup: (path: number[]) => void
  maxDepth: number
  queryBuilderValid?: boolean
  submitButtonClicked: boolean
  getDisabledFields: () => string[]
  testIds?: TestId
}

export type ValueEditorValidationProps = {
  validation?: ValidationResult | boolean
  touched?: boolean
  handleTouched?: (val?: boolean) => void
}

export type TestId = {
  addRuleButton?: string
  addGroupButton?: string
  select?: string
  multiSelect?: string
  runQueryButton?: string
  controls?: string
  valueEditor?: string
  fieldSelector?: string
  validationErrors?: string
  header?: string
  footer?: string
}

type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K]
}

import type { ReactNode } from 'react'
import type {
  Field as QueryBuilderField,
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

interface BasicField
  extends Omit<QueryBuilderField, 'inputType' | 'valueEditorType'> {
  inputType?: 'text' | 'number' | null
  valueEditorType?: 'text' | 'number' | 'select' | 'multiselect' | null
  hideOperator?: boolean
}
interface RangeField
  extends Omit<QueryBuilderField, 'inputType' | 'valueEditorType'>,
    Partial<RangeFieldOptions> {
  valueEditorType?: 'range'
}

interface BooleanField
  extends Omit<QueryBuilderField, 'inputType' | 'valueEditorType' | 'values'> {
  valueEditorType?: 'boolean'
}

interface AutoCompleteField
  extends Omit<QueryBuilderField, 'inputType' | 'valueEditorType'> {
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

export type BaseValueEditorProps = Omit<ValueEditorProps, 'schema'>
export type BaseVersatileSelectorProps = Omit<VersatileSelectorProps, 'schema'>
export type Field = BasicField | RangeField | AutoCompleteField | BooleanField
export type QueryBuilderErrors = {
  [key: string]: ValidationResult | true
}
export type QueryBuilderContext = {
  removeGroup: (path: number[]) => void
  maxDepth: number
  queryBuilderValid?: boolean
}
export type ValueEditorValidationProps = {
  validation?: ValidationResult | boolean
  touched?: boolean
  handleTouched?: (val?: boolean) => void
}

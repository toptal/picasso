import type { MouseEventHandler, ReactNode } from 'react'
import type {
  Field as QueryBuilderField,
  FullField,
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

/**
 * react-querybuilder's `Field` carries a `[key: string]: unknown` index
 * signature, which makes `Omit` collapse every declared property to the index
 * type — strip it before deriving the field variants below.
 */
type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K]
}

type StrictQueryBuilderField = RemoveIndexSignature<QueryBuilderField>

interface BasicField
  extends Omit<StrictQueryBuilderField, 'inputType' | 'valueEditorType'> {
  inputType?: 'text' | 'number' | null
  valueEditorType?: 'text' | 'number' | 'select' | null
  hideOperator?: boolean
}
interface RangeField
  extends Omit<StrictQueryBuilderField, 'inputType' | 'valueEditorType'>,
    Partial<RangeFieldOptions> {
  valueEditorType?: 'range'
}

interface BooleanField
  extends Omit<
    StrictQueryBuilderField,
    'inputType' | 'valueEditorType' | 'values'
  > {
  valueEditorType?: 'boolean'
}
interface MultiSelectField
  extends Omit<StrictQueryBuilderField, 'inputType' | 'valueEditorType'> {
  valueEditorType?: 'multiselect'
  enableReset?: boolean
  enableResetSearch?: boolean
}

interface AutoCompleteField
  extends Omit<StrictQueryBuilderField, 'inputType' | 'valueEditorType'> {
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

/**
 * Everything Picasso's custom editors and selectors read off `fieldData`.
 * Upstream types `fieldData` as `FullField`, whose index signature yields
 * `unknown` for the custom properties Picasso fields carry, so the upstream
 * prop types are instantiated with this type instead.
 */
type EditorFieldData = FullField &
  RangeFieldOptions & {
    hideOperator?: boolean
    onClick?: MouseEventHandler<HTMLInputElement>
    loading?: boolean
    enableReset?: boolean
    enableResetSearch?: boolean
    onSearch?: (searchTerm: string) => void
    options?: { label: string; name: string }[]
  }

export type BaseValueEditorProps = Omit<
  ValueEditorProps<EditorFieldData>,
  'schema'
>
export type BaseVersatileSelectorProps = Omit<
  VersatileSelectorProps,
  'schema' | 'fieldData'
> & {
  fieldData?: EditorFieldData
}
/**
 * Custom properties beyond the variants below are still allowed (v6's `Field`
 * permitted them through an `any` index signature); they surface as `unknown`,
 * mirroring react-querybuilder v7+.
 */
export type Field = (
  | BasicField
  | RangeField
  | AutoCompleteField
  | BooleanField
  | MultiSelectField
) & {
  [key: string]: unknown
}
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
  cloneRuleButton?: string
  removeRuleButton?: string
  addGroupButton?: string
  cloneGroupButton?: string
  removeGroupButton?: string
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

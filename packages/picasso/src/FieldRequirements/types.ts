export interface FieldRequirement<TValueType> {
  message: string
  validator: (value: TValueType) => boolean
  testIds?: {
    root?: string
    successIcon?: string
    errorIcon?: string
    defaultIcon?: string
  }
}

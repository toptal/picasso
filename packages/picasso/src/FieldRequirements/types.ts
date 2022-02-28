export interface FieldRequirement {
  message: string
  validator: (value: any) => boolean
  'data-testid'?: string
}

import type { API } from 'jscodeshift'

export type TransformationOptions = {
  api: API
  reportManuallyFixableCase: () => void
  addSpacingImport: (spacingIdentifier: string) => void
}

export type ManuallyFixableCase = {
  componentName: string
  attributeName: string
  location: string
}

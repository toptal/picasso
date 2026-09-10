import type { ReactElement, ReactNode } from 'react'
import {
  ExternallyChanged as UntypedExternallyChanged,
  OnBlur as UntypedOnBlur,
  OnChange as UntypedOnChange,
  OnFocus as UntypedOnFocus,
} from 'react-final-form-listeners'

export interface OnChangeProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FieldValue = any
> {
  /** Name of the field to watch */
  name: string
  /** Called with the new and the previous value every time the field's value changes */
  children: (value: FieldValue, previous: FieldValue) => void
}

export interface OnBlurProps {
  /** Name of the field to watch */
  name: string
  /** Called every time the field loses focus */
  children: () => void
}

export interface OnFocusProps {
  /** Name of the field to watch */
  name: string
  /** Called every time the field gains focus */
  children: () => void
}

export interface ExternallyChangedProps {
  /** Name of the field to watch */
  name: string
  /** Rendered with whether the field's value last changed while the field was not focused */
  children: (externallyChanged: boolean) => ReactNode
}

// `react-final-form-listeners@3.0.1` publishes its declarations at
// `dist/src/index.d.ts` while `package.json` still points `types` at
// `dist/index.d.ts`, so a consumer install resolves the package untyped and
// these four components reach consumers as `any` — `skipLibCheck` hides that
// inside our own declarations. The pnpm patch corrects the path for this
// build; declaring the components here is what puts real types in the
// published package. Drop the casts once a release ships the corrected path.
export const OnChange = UntypedOnChange as <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FieldValue = any
>(
  props: OnChangeProps<FieldValue>
) => ReactElement | null

export const OnBlur = UntypedOnBlur as (
  props: OnBlurProps
) => ReactElement | null

export const OnFocus = UntypedOnFocus as (
  props: OnFocusProps
) => ReactElement | null

export const ExternallyChanged = UntypedExternallyChanged as (
  props: ExternallyChangedProps
) => ReactElement | null

import { useFieldArray as useFinalFormFieldArray } from 'react-final-form-arrays'

import type { FieldArrayRenderProps, UseFieldArrayConfig } from './types'

/**
 * `useFieldArray` from `react-final-form-arrays`, typed by the array's item
 * type the way `react-final-form-arrays@3` typed it. Upstream 5 declares the
 * items as `any` and leaves `fields.update` out, although the hook binds every
 * `final-form-arrays` mutator (`update` included) to the field name at runtime.
 * The runtime is upstream's; only the signature is Picasso's.
 * The default subscription is upstream's: `length`, `value` and `error`.
 * Upstream narrowed it from every key after nested arrays re-rendered on every
 * field change (react-final-form-arrays#119), so `meta.dirty`, `meta.touched`,
 * `meta.submitError`, … read `undefined` unless `subscription` names them.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFieldArray = useFinalFormFieldArray as <FieldValue = any>(
  name: string,
  config?: UseFieldArrayConfig<FieldValue>
) => FieldArrayRenderProps<FieldValue>

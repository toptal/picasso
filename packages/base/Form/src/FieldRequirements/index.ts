import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './FieldRequirements'

export { default as FieldRequirements } from './FieldRequirements'
export * from './types'
export type FieldRequirementsProps<TValueType> = OmitInternalProps<
  Props<TValueType>
>

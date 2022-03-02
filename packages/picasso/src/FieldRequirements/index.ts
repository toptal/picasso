import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './FieldRequirements'
import { ValueType } from './types'

export { default } from './FieldRequirements'
export * from './types'
export type FieldRequirementsProps<
  TInputType extends ValueType = ValueType
> = OmitInternalProps<Props<TInputType>>

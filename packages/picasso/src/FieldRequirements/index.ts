/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './FieldRequirements'

export { default } from './FieldRequirements'
export * from './types'
export type FieldRequirementsProps<TValueType> = OmitInternalProps<
  Props<TValueType>
>

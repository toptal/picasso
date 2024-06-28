import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './types'

export { default as OutlinedInput } from './OutlinedInput'
export type OutlinedInputProps = OmitInternalProps<Props>
export * from './OutlinedInput'
export type { Status, BaseInputProps, InputProps, Size, Props } from './types'

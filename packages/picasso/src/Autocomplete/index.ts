import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props as OuterProps } from './Autocomplete'
export { default } from './Autocomplete'
export * from './types'
export type Props = OmitInternalProps<OuterProps>

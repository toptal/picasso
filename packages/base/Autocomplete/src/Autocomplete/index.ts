import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as OuterProps } from './Autocomplete'
export { default as Autocomplete } from './Autocomplete'
export * from './types'
export type AutocompleteProps = OmitInternalProps<OuterProps>
/** @deprecated [FX-4714] Use AutocompleteProps instead */
export type Props = AutocompleteProps

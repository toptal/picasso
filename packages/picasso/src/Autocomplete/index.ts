/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as OuterProps } from './Autocomplete'
export { default } from './Autocomplete'
export * from './types'
export type AutocompleteProps = OmitInternalProps<OuterProps>
/** @deprecated Use AutocompleteProps instead */
export type Props = AutocompleteProps

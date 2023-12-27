/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalInputProps } from './Input'
export { default } from './Input'
export type InputProps = OmitInternalProps<InternalInputProps>
/** @deprecated Use InputProps instead */
export type Props = InputProps

/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalFormProps } from './Form'
export { default } from './Form'
export type FormProps = OmitInternalProps<InternalFormProps>
/** @deprecated Use FormProps instead */
export type Props = FormProps

import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalFormProps } from './Form'
export { default } from './Form'
export type FormProps = OmitInternalProps<InternalFormProps>
/** @deprecated [@@BARE_PROPS_EXPORTS] Use FormProps instead */
export type Props = FormProps

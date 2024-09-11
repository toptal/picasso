import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalFormProps } from './Form'
export { default as Form } from './Form'
export type FormProps = OmitInternalProps<InternalFormProps>

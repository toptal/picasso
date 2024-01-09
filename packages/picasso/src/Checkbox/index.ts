import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalCheckboxProps } from './Checkbox'
export { default } from './Checkbox'
export type CheckboxProps = OmitInternalProps<InternalCheckboxProps>
/** @deprecated [FX-4714] Use CheckboxProps instead */
export type Props = CheckboxProps

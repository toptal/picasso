import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalCheckboxProps } from './Checkbox'
export { default as Checkbox } from './Checkbox'
export type CheckboxProps = OmitInternalProps<InternalCheckboxProps>
/** @deprecated Use CheckboxProps instead */
export type Props = CheckboxProps

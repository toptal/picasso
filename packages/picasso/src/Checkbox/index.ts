import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props as InternalCheckboxProps } from './Checkbox'
export { default } from './Checkbox'
export type CheckboxProps = OmitInternalProps<InternalCheckboxProps>
/** @deprecated Use CheckboxProps instead */
export type Props = CheckboxProps

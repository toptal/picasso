/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalCheckboxProps } from './Checkbox'
export { default } from './Checkbox'
export type CheckboxProps = OmitInternalProps<InternalCheckboxProps>
/** @deprecated Use CheckboxProps instead */
export type Props = CheckboxProps

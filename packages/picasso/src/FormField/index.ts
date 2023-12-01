/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './FormField'

export { default } from './FormField'
export type FormFieldProps = OmitInternalProps<Props>

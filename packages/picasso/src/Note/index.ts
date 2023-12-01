/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Note'

export { default } from './Note'
export type NoteProps = OmitInternalProps<Props>

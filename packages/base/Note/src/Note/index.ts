import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Note'

export { default as Note } from './Note'
export type NoteProps = OmitInternalProps<Props>

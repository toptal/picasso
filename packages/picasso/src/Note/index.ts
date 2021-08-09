import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Note'

export { default } from './Note'
export type NoteProps = OmitInternalProps<Props>

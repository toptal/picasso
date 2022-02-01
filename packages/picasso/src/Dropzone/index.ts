import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Dropzone'
export { default } from './Dropzone'
export * from './types'

export type DropzoneProps = OmitInternalProps<Props>

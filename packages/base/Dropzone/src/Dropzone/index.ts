import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Dropzone'
export { default as Dropzone } from './Dropzone'
export * from './types'

export type DropzoneProps = OmitInternalProps<Props>

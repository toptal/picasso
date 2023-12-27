/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Dropzone'
export { default } from './Dropzone'
export * from './types'

export type DropzoneProps = OmitInternalProps<Props>

import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalFileInputProps } from './FileInput'
export { default as FileInput } from './FileInput'
export * from './types'
export type FileInputProps = OmitInternalProps<InternalFileInputProps>
/** @deprecated [FX-4714] Use FileInputProps instead */
export type Props = FileInputProps

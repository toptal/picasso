/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalFileInputProps } from './FileInput'
export { default } from './FileInput'
export * from './types'
export type FileInputProps = OmitInternalProps<InternalFileInputProps>
/** @deprecated Use FileInputProps instead */
export type Props = FileInputProps

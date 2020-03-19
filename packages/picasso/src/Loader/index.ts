import { OmitInternalProps } from '@toptal/picasso-shared'

export { default } from './Loader'
import { Props } from './Loader'
export type LoaderProps = OmitInternalProps<Props>

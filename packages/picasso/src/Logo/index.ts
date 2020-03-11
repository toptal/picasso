import { OmitInternalProps } from '@toptal/picasso-shared'

export { default } from './Logo'
import { Props } from './Logo'
export type LogoProps = OmitInternalProps<Props>

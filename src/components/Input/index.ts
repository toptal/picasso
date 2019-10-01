import { Props } from './Input'
import { OmitInternalProps } from '../Picasso'
export { default } from './Input'
export type Props = OmitInternalProps<Props>

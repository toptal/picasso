import { OmitInternalProps } from '@toptal/picasso-shared'

export { default } from './Step'
import { Props } from './Step'
export type StepProps = OmitInternalProps<Props>

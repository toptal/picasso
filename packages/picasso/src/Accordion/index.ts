import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Accordion'

export { default } from './Accordion'
export type AccordionProps = OmitInternalProps<Props>

export { default as Details } from './Details'
export { default as Summary } from './Summary'

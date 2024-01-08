import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Accordion'

export { default as Accordion } from './Accordion'
export type AccordionProps = OmitInternalProps<Props>

export { default as Details } from './Details'
export { default as Summary } from './Summary'

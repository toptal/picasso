import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Collapse'

export { default as Collapse } from './Collapse'
export type CollapseProps = OmitInternalProps<Props>
/** @deprecated [PF-2317] misnamed re-export — use `CollapseProps` instead */
export type FadeProps = OmitInternalProps<Props>

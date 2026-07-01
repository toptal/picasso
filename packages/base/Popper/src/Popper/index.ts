import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Popper'

export { default as Popper } from './Popper'
export type PopperProps = OmitInternalProps<Props>
export type {
  PopperModifierOptions,
  PopperModifiers,
  PopperOptions,
  PopperPadding,
  PopperPlacementType,
  PopperReferenceObject,
  PopperHandle,
} from './Popper'

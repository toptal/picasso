/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Slider'

export { default } from './Slider'
export { useSliderContext } from './SliderContext'
export type SliderProps = OmitInternalProps<Props>

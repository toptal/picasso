import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Slider'

export { default } from './Slider'
export { useSliderContext } from './SliderContext'
export type SliderProps = OmitInternalProps<Props>

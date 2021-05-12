import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Grid'

export { default } from './Grid'
export type GridProps = OmitInternalProps<Props>
export type { GridSize } from '@material-ui/core/Grid'

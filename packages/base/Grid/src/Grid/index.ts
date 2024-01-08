import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Grid'

export { default as Grid } from './Grid'
export type GridProps = OmitInternalProps<Props>
export type { GridSize } from '@material-ui/core/Grid'

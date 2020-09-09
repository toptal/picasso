import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Table'
export { TableSectionContext, TableSection } from './TableSectionContext'

export { default } from './Table'
export type TableProps = OmitInternalProps<Props>

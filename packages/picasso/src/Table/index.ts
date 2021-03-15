import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Table'
export { TableSectionContext, TableSection } from './TableSectionContext'
export { default as TableContext } from './TableContext'

export { default } from './Table'
export type TableProps = OmitInternalProps<Props>

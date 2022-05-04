import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Table'
export { TableSectionContext, TableSection } from './TableSectionContext'
export { default as TableContext } from './TableContext'
export type { TableConfig } from './TableContext'
export type { TableSpacing, TableVariant } from './types'
export { default } from './Table'
export type TableProps = OmitInternalProps<Props>

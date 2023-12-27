/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Table'
export { TableSectionContext, TableSection } from './TableSectionContext'
export { default as TableContext } from './TableContext'
export type { TableConfig } from './TableContext'

export { default } from './Table'
export type TableProps = OmitInternalProps<Props>

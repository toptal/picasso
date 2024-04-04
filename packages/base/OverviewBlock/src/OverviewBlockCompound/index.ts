import { OverviewBlock } from '../OverviewBlock'
import { OverviewBlockGroup } from '../OverviewBlockGroup'
import { OverviewBlockRow } from '../OverviewBlockRow'

type OverviewBlockCompoundType = typeof OverviewBlock & {
  Group: typeof OverviewBlockGroup
  Row: typeof OverviewBlockRow
}

export const OverviewBlockCompound: OverviewBlockCompoundType = Object.assign(
  OverviewBlock,
  {
    Group: OverviewBlockGroup,
    Row: OverviewBlockRow,
  }
)

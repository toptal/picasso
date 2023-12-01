/* eslint-disable import/no-extraneous-dependencies */
import OverviewBlock from '@toptal/picasso-overview-block'
import OverviewBlockGroup from '@toptal/picasso-overview-block-group'
import OverviewBlockRow from '@toptal/picasso-overview-block-row'

export const OverviewBlockCompound = Object.assign(OverviewBlock, {
  Group: OverviewBlockGroup,
  Row: OverviewBlockRow,
})

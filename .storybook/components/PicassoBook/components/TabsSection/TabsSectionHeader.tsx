import React, { Fragment, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Classes } from '../../../../../packages/shared'
import { Typography, Tabs } from '../../../../../packages/picasso'

import { TabOptions } from './TabsSection'
import styles from './styles'

interface Props {
  classes: Classes
  tabs: TabOptions[]
  selectedTab: number
  onChange: (event: React.ChangeEvent<{}>, value: number) => void
}

const TabsSectionHeader: FunctionComponent<Props> = props => {
  const { classes, tabs, selectedTab, onChange } = props

  return (
    <Fragment>
      <Tabs value={selectedTab} onChange={onChange}>
        {tabs.map(tab => (
          <Tabs.Tab key={tab.name} label={tab.name} />
        ))}
      </Tabs>
      <Typography weight='semibold' className={classes.description}>
        {tabs[selectedTab].description}
      </Typography>
    </Fragment>
  )
}

TabsSectionHeader.displayName = 'TabsSectionHeader'

export default withStyles(styles)(TabsSectionHeader)

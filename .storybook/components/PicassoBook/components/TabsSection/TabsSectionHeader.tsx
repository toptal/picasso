import React, { Fragment } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Typography, Tabs } from '@toptal/picasso'
import { Classes } from '@toptal/picasso-shared'

import { TabOptions } from './TabsSection'
import styles from './styles'

interface Props {
  tabs: TabOptions[]
  selectedTab: number
  onChange: (event: React.ChangeEvent<{}>, value: number) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTabsSectionHeader'
})

const TabsSectionHeader = (props: Props) => {
  const classes = useStyles()

  const { tabs, selectedTab, onChange } = props

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

export default TabsSectionHeader

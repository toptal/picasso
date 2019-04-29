import React, { Fragment, FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { Classes } from '@components/styles/types'
import { Typography, Paper, Container } from '@components'

import { TabOptions } from './TabsSection'
import styles from './styles'

interface Props {
  classes: Classes
  tabs: TabOptions[]
  selectedTab: number
  onChange: (event: any, selectedTab: number) => void
}

const TabsSectionHeader: FunctionComponent<Props> = props => {
  const { classes, tabs, selectedTab, onChange } = props

  return (
    <Fragment>
      <Paper classes={{ root: classes.tabsHeader }}>
        <Tabs
          value={selectedTab}
          onChange={onChange}
          indicatorColor='primary'
          textColor='primary'
        >
          {tabs.map(tab => (
            <Tab
              key={tab.name}
              label={<Typography weight='semibold'>{tab.name}</Typography>}
              classes={{ root: classes.tabRoot }}
            />
          ))}
        </Tabs>
      </Paper>
      <Container bottom={1}>
        <Typography variant='h5' className={classes.description}>
          {tabs[selectedTab].description}
        </Typography>
      </Container>
    </Fragment>
  )
}

export default withStyles(styles)(TabsSectionHeader)

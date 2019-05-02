import React, { Fragment, FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { Classes } from '@components/styles/types'
import { Paper } from '@components'

import TabsSectionHeader from './TabsSectionHeader'

export interface TabOptions {
  name: string
  description?: string
  content: ReactNode
}

interface Props {
  tabs: TabOptions[]
}

const TabsSection: FunctionComponent<Props> = props => {
  const { tabs } = props

  const [selectedTab, setSelectedTab] = React.useState(0)

  function handleChange(event: any, selectedTab: number) {
    setSelectedTab(selectedTab)
  }

  const hasMultiple = tabs.length > 1

  return (
    <Fragment>
      {hasMultiple && (
        <TabsSectionHeader
          tabs={tabs}
          selectedTab={selectedTab}
          onChange={handleChange}
        />
      )}
      {tabs.map(
        (tab, index) =>
          index === selectedTab && (
            <Paper key={tab.name} className='component-section-container'>
              {tab.content}
            </Paper>
          )
      )}
    </Fragment>
  )
}

export default TabsSection

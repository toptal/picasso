import React, { FunctionComponent, ReactNode } from 'react'
import { Paper, Container } from '@toptal/picasso'

import TabsSectionHeader from './TabsSectionHeader'

export interface TabOptions {
  name?: string
  description?: string
  content?: ReactNode
}

interface Props {
  tabs: TabOptions[]
}

const TabsSection: FunctionComponent<Props> = props => {
  const { tabs } = props

  const [selectedTab, setSelectedTab] = React.useState(0)

  function handleChange(event: any, value: number) {
    setSelectedTab(value)
  }

  const hasMultiple = tabs.length > 1

  return (
    <Paper>
      <Container padded='medium'>
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
              <div key={tab.name || index}>{tab.content}</div>
            )
        )}
      </Container>
    </Paper>
  )
}

export default TabsSection

import React, { ReactNode } from 'react'

import { Paper, Container, Typography } from '@toptal/picasso'
import { useBreakpoint } from '@toptal/picasso-provider'

import TabsSectionHeader from './TabsSectionHeader'

export interface TabOptions {
  name?: string
  description?: string
  content?: ReactNode
}

interface Props {
  tabs: TabOptions[]
  hideOnCompactLayout?: boolean
}

const TabsSection = (props: Props) => {
  const { tabs, hideOnCompactLayout } = props

  const [selectedTab, setSelectedTab] = React.useState(0)

  function handleChange(event: any, value: number) {
    setSelectedTab(value)
  }

  const hasMultiple = tabs.length > 1

  const isCompactLayout = useBreakpoint('small')

  if (isCompactLayout && hideOnCompactLayout) {
    return <Typography size='medium'>Not visible on smaller screens</Typography>
  }

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

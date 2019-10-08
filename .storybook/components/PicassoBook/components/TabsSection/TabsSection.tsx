import React, { FunctionComponent, ReactNode } from 'react'

import { Paper, Container, Typography } from '@components'
import { useBreakpoint } from '@components/utils'

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

const TabsSection: FunctionComponent<Props> = props => {
  const { tabs, hideOnCompactLayout } = props

  const [selectedTab, setSelectedTab] = React.useState(0)

  function handleChange(event: any, selectedTab: number) {
    setSelectedTab(selectedTab)
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

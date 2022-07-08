import React, { Fragment, FunctionComponent } from 'react'
import { styled } from '@mui/material/styles'
import { Typography, Tabs } from '@toptal/picasso'

import { TabOptions } from './TabsSection'
import Markdown from '~/.storybook/components/Markdown'

const Description = styled(Typography)(() => ({
  fontSize: '0.75em',
  marginTop: '0.5rem',
  marginBottom: '1rem',
}))

interface Props {
  tabs: TabOptions[]
  selectedTab: number
  onChange: (event: React.ChangeEvent<{}>, value: number) => void
}

const TabsSectionHeader: FunctionComponent<Props> = props => {
  const { tabs, selectedTab, onChange } = props

  return (
    <Fragment>
      <Tabs value={selectedTab} onChange={onChange}>
        {tabs.map(tab => (
          <Tabs.Tab key={tab.name} label={tab.name} />
        ))}
      </Tabs>
      <Description weight='semibold'>
        <Markdown>{tabs[selectedTab].description ?? ''}</Markdown>
      </Description>
    </Fragment>
  )
}

TabsSectionHeader.displayName = 'TabsSectionHeader'

export default TabsSectionHeader

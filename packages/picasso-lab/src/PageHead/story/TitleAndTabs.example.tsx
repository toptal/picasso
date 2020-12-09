import React from 'react'
import { PageHead } from '@toptal/picasso-lab'
import { Tabs } from '@toptal/picasso'

const TitleAndTabsExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue)
  }

  return (
    <PageHead>
      <PageHead.Main>
        <PageHead.Title>Heading Large</PageHead.Title>
      </PageHead.Main>
      <PageHead.Tabs>
        <Tabs value={value} onChange={handleChange}>
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' />
        </Tabs>
      </PageHead.Tabs>
    </PageHead>
  )
}

export default TitleAndTabsExample

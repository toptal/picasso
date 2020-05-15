import React from 'react'
import { Subheader } from '@toptal/picasso-lab'
import { Tabs } from '@toptal/picasso'

const TitleAndTabsExample = () => {
  const [value, setValue] = React.useState(0)

  function handleChange(_: any, newValue: number) {
    setValue(newValue)
  }

  return (
    <Subheader>
      <Subheader.Main>
        <Subheader.Title>Heading Large</Subheader.Title>
      </Subheader.Main>
      <Subheader.Tabs>
        <Tabs value={value} onChange={handleChange}>
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' />
        </Tabs>
      </Subheader.Tabs>
    </Subheader>
  )
}

export default TitleAndTabsExample

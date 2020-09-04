import React from 'react'
import { Title } from '@toptal/picasso-lab'
import { Tabs } from '@toptal/picasso'

const TitleAndTabsExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Title>
      <Title.Main>
        <Title.Title>Heading Large</Title.Title>
      </Title.Main>
      <Title.Tabs>
        <Tabs value={value} onChange={handleChange}>
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' />
        </Tabs>
      </Title.Tabs>
    </Title>
  )
}

export default TitleAndTabsExample

import React from 'react'
import { Tabs, PageHead } from '@toptal/picasso'

const TitleAndTabsExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue)
  }

  const tabs = (
    <Tabs value={value} onChange={handleChange}>
      <Tabs.Tab label='Label' />
      <Tabs.Tab label='Label' />
      <Tabs.Tab label='Label' />
    </Tabs>
  )

  return <PageHead title='Heading Large' controls={tabs} />
}

export default TitleAndTabsExample

import React from 'react'
import { Tabs, PageHeadBase } from '@toptal/picasso'

const TitleAndTabsExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}> | null, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <PageHeadBase title='Heading Large' noBorder />

      <Tabs value={value} onChange={handleChange}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>
    </>
  )
}

export default TitleAndTabsExample

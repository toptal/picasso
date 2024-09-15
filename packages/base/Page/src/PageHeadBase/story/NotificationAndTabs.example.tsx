import React from 'react'
import { Notification, PageHeadBase, Tabs } from '@toptal/picasso'

const NotificationAndTabsExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}> | null, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <PageHeadBase title='Heading Large' noBorder />

      <div className='mb-3'>
        <Notification>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Notification>
      </div>

      <Tabs value={value} onChange={handleChange}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>
    </>
  )
}

export default NotificationAndTabsExample

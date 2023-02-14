/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container, Tabs } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const TAB_COUNT = 2

const Example = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div style={{ width: '45rem', border: `1px solid ${palette.grey.light}` }}>
      <Tabs value={value} onChange={handleChange} variant='fullWidth'>
        {Array.from({ length: TAB_COUNT }).map((_, index) => (
          <Tabs.Tab key={index} label='Label' />
        ))}
      </Tabs>
      <Container padded='small'>Content of tab #{value}</Container>
    </div>
  )
}

export default Example

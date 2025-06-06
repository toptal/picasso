import React from 'react'
import { Container, Tabs, Tooltip, Badge } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Exclamation16 } from '@toptal/picasso-icons'

const Example = () => {
  const [value, setValue] = React.useState<number>(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tabs.Tab
          label='Label'
          icon={
            <Tooltip content='Some content...' placement='top'>
              <div>
                <Exclamation16 color='red' />
              </div>
            </Tooltip>
          }
        />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' icon={<Badge content={10} variant='white' />} />
      </Tabs>

      {value === 0 && (
        <Container top={SPACING_4}>Content of the first tab</Container>
      )}
      {value === 1 && (
        <Container top={SPACING_4}>Content of the second tab</Container>
      )}
      {value === 2 && (
        <Container top={SPACING_4}>Content of the third tab</Container>
      )}
    </div>
  )
}

export default Example

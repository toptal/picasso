import React from 'react'
import { Container, Tabs, Tooltip } from '@toptal/picasso'
import { Exclamation16 } from '@toptal/picasso/Icon'

const Example = () => {
  const [value, setValue] = React.useState(0)

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
              <span>
                <Exclamation16 color='red' />
              </span>
            </Tooltip>
          }
        />
        <Tabs.Tab label='Label' />
        <Tabs.Tab
          label='Label'
          icon={
            <Tooltip content='Some content...' placement='top'>
              <span>
                <Exclamation16 color='red' />
              </span>
            </Tooltip>
          }
        />
      </Tabs>

      {value === 0 && (
        <Container top='small'>Content of the first tab</Container>
      )}
      {value === 1 && (
        <Container top='small'>Content of the second tab</Container>
      )}
      {value === 2 && (
        <Container top='small'>Content of the third tab</Container>
      )}
    </div>
  )
}

export default Example

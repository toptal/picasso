import React from 'react'
import { Container, Tabs } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div style={{ flexGrow: 1, display: 'flex', height: '150px' }}>
      <Tabs value={value} onChange={handleChange} orientation='vertical'>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>
      {value === 0 && (
        <Container left='small' top='small'>
          Content of the first tab
        </Container>
      )}
      {value === 1 && (
        <Container left='small' top='small'>
          Content of the first tab
        </Container>
      )}
      {value === 2 && (
        <Container left='small' top='small'>
          Content of the first tab
        </Container>
      )}
      {value === 3 && (
        <Container left='small' top='small'>
          Content of the first tab
        </Container>
      )}
      {value === 4 && (
        <Container left='small' top='small'>
          Content of the first tab
        </Container>
      )}
    </div>
  )
}

export default Example

import React from 'react'
import { Tabs, Button } from '@toptal/picasso'
import { Subheader } from '@toptal/picasso-lab'

const DefaultExample = () => {
  const [value, setValue] = React.useState(0)

  function handleChange(_, newValue) {
    setValue(newValue)
  }

  return (
    <Subheader>
      <Subheader.Breadcrumb />
      <Subheader.Main>
        <Subheader.Title>Heading Large</Subheader.Title>
        <Subheader.Actions>
          <Button size='small' variant='secondary-blue'>
            Button
          </Button>
          <Button size='small' variant='secondary-blue'>
            Button
          </Button>
          <Button size='small' variant='secondary-blue'>
            Button
          </Button>
        </Subheader.Actions>
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

export default DefaultExample

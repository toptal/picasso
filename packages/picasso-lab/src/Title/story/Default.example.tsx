import React from 'react'
import { Tabs, Button } from '@toptal/picasso'
import { Title } from '@toptal/picasso-lab'

const DefaultExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Title>
      <Title.Breadcrumb />
      <Title.Main>
        <Title.Title>Heading Large</Title.Title>
        <Title.Actions>
          <Button size='small' variant='secondary-blue'>
            Button
          </Button>
          <Button size='small' variant='secondary-blue'>
            Button
          </Button>
          <Button size='small' variant='secondary-blue'>
            Button
          </Button>
        </Title.Actions>
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

export default DefaultExample

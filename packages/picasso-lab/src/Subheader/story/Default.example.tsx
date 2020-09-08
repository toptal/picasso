import React from 'react'
import { Tabs, Button, Link } from '@toptal/picasso'
import { Subheader, Breadcrumbs } from '@toptal/picasso-lab'

const DefaultExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Subheader>
      <Breadcrumbs>
        <Breadcrumbs.Item
          as={Link}
          href='https://en.wikipedia.org/wiki/United_States'
        >
          USA
        </Breadcrumbs.Item>
        <Breadcrumbs.Item
          as={Link}
          href='https://en.wikipedia.org/wiki/Software'
        >
          Software
        </Breadcrumbs.Item>
        <Breadcrumbs.Item as={Link} href='https://toptal.com'>
          Toptal
        </Breadcrumbs.Item>
      </Breadcrumbs>
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

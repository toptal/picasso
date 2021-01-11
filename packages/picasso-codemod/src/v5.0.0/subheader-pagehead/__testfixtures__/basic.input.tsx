import React from 'react'
import { Tabs, Button, Link } from '@toptal/picasso'
import { Subheader, Breadcrumbs } from '@toptal/picasso-lab'

const DefaultExample = () => (
  <Subheader>
    <Breadcrumbs>
      <Breadcrumbs.Item
        as={Link}
        href='https://en.wikipedia.org/wiki/United_States'
      >
        USA
      </Breadcrumbs.Item>
      <Breadcrumbs.Item as={Link} href='https://en.wikipedia.org/wiki/Software'>
        Software
      </Breadcrumbs.Item>
      <Breadcrumbs.Item as={Link} href='https://toptal.com'>
        Toptal
      </Breadcrumbs.Item>
    </Breadcrumbs>
    <Subheader.Main>
      <Subheader.Title>Heading Large</Subheader.Title>
      <Subheader.Actions>
        <Button size='small' variant='secondary'>
          Button
        </Button>
        <Button size='small' variant='secondary'>
          Button
        </Button>
        <Button size='small' variant='secondary'>
          Button
        </Button>
      </Subheader.Actions>
    </Subheader.Main>
    <Subheader.Tabs>
      <Tabs value={1} onChange={() => {}}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>
    </Subheader.Tabs>
  </Subheader>
)

export default DefaultExample

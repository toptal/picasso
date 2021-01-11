import React from 'react'
import { Tabs, Button, Link } from '@toptal/picasso'
import { PageHead as Something, Breadcrumbs } from '@toptal/picasso-lab'

const DefaultExample = () => (
  <Something>
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
    <Something.Main>
      <Something.Title>Heading Large</Something.Title>
      <Something.Actions>
        <Button size='small' variant='secondary'>
          Button
        </Button>
        <Button size='small' variant='secondary'>
          Button
        </Button>
        <Button size='small' variant='secondary'>
          Button
        </Button>
      </Something.Actions>
    </Something.Main>
    <Something.Tabs>
      <Tabs value={1} onChange={() => {}}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>
    </Something.Tabs>
  </Something>
)

export default DefaultExample

import React from 'react'
import { Button, Link, PageHead, Breadcrumbs, Badge } from '@toptal/picasso'
import { TagRectangular } from '@toptal/picasso-tag'

const DefaultExample = () => {
  const breadcrumbs = (
    <Breadcrumbs>
      <Breadcrumbs.Item
        as={Link}
        variant='action'
        href='https://en.wikipedia.org/wiki/United_States'
      >
        USA
      </Breadcrumbs.Item>
      <Breadcrumbs.Item
        as={Link}
        variant='action'
        href='https://en.wikipedia.org/wiki/Software'
      >
        Software
      </Breadcrumbs.Item>
      <Breadcrumbs.Item as={Link} variant='action' href='https://toptal.com'>
        Toptal
      </Breadcrumbs.Item>
    </Breadcrumbs>
  )

  const actions = (
    <>
      <Button size='small' variant='secondary'>
        Button
      </Button>
      <Button.Split size='small' variant='secondary'>
        Button
      </Button.Split>
      <Button size='small' variant='secondary'>
        Button
      </Button>
    </>
  )

  return (
    <PageHead
      actions={actions}
      breadcrumbs={breadcrumbs}
      subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      title='Heading Large'
      titleAdornments={[
        <Badge variant='white' content={1} />,
        <TagRectangular variant='green'>Label</TagRectangular>,
      ]}
    />
  )
}

export default DefaultExample

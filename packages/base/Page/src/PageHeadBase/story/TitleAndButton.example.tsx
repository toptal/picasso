import React from 'react'
import { PageHeadBase, Button, Settings16 } from '@toptal/picasso'

const TitleAndButtonExample = () => (
  <PageHeadBase
    title='Heading Large'
    actions={<Button.Circular variant='flat' icon={<Settings16 />} />}
  />
)

export default TitleAndButtonExample

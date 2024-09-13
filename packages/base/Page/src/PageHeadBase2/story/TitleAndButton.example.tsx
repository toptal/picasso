import React from 'react'
import { PageHead, Button, Settings16 } from '@toptal/picasso'

const TitleAndButtonExample = () => (
  <PageHead
    title='Heading Large'
    actions={<Button.Circular variant='flat' icon={<Settings16 />} />}
  />
)

export default TitleAndButtonExample
